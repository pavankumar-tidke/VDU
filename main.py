from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request
import asyncio
import json
import datetime
import calendar
from pydantic import BaseModel
import os
from agents.ollma_agent import ask_ollama

app = FastAPI()


def get_current_day():
    return datetime.now().strftime("%a")  # 'Sun', 'Mon', etc.


with open("train_schedule copy 2.json") as f:
    train_schedule = json.load(f)

train_event_state = {}
websocket_clients = set()

# In-memory state for platforms, routes, and trains
platform_state = {}  # {platform_no: train_number or None}
route_state = {}  # {route_id: train_number or None}
train_state = {}  # {train_number: {...train details...}}

OCCUPANCY_STATE_FILE = "occupancy_state.json"


class TrainInfo(BaseModel):
    train_number: str
    # Add other fields as needed


async def train_timing_monitor():
    i = 0  # Start from first train

    while i < len(train_schedule):
        now_dt = datetime.datetime.now()
        today = calendar.day_abbr[now_dt.weekday()]  # e.g., 'Sun'

        train = train_schedule[i]
        train_no = train["train_number"]

        # If train doesn't run today, skip it
        if today not in train["days_of_week"]:
            print(f"[SKIP] Train {train_no} does not run today ({today})")
            i += 1
            continue

        # Parse scheduled arrival time
        arrival_time = datetime.datetime.strptime(
            train["start_time"], "%H:%M:%S"
        ).time()
        arrival_dt = now_dt.replace(
            hour=arrival_time.hour,
            minute=arrival_time.minute,
            second=arrival_time.second,
            microsecond=0,
        )

        # If the train's time was earlier today and already passed → skip it
        if now_dt > arrival_dt + datetime.timedelta(seconds=60):
            print(f"[SKIP] Train {train_no} missed at {arrival_dt.time()} (>60s ago)")
            i += 1
            continue

        # If the train's time is now (within -5 to +30s) → send it
        delta = (arrival_dt - now_dt).total_seconds()
        # print(f"[DEBUG] Train {train_no} | Now: {now_dt.time()} | Scheduled: {arrival_dt.time()} | Δ = {delta:.1f}s"
        # )

        if -5 <= delta <= 30:
            print(
                f"[ARRIVAL] Train {train_no} arriving at {train['entry_segment']} ({train['start_time']})"
            )
            for ws in list(websocket_clients):
                try:
                    await ws.send_json({"event": "train_arrival", "train_info": train})
                except Exception as e:
                    print(f"[ERROR] WebSocket send failed: {e}")
                    websocket_clients.discard(ws)
            i += 1  # Move to next train
        else:
            # print(f"[WAITING] Train {train_no} scheduled later today in {int(delta)}s")
            await asyncio.sleep(min(5, delta))  # Wait for a bit

        await asyncio.sleep(1)


def save_occupancy_state():
    state = {
        "platform_state": platform_state,
        "route_state": route_state,
    }
    with open(OCCUPANCY_STATE_FILE, "w") as f:
        json.dump(state, f)


def load_occupancy_state():
    if os.path.exists(OCCUPANCY_STATE_FILE):
        with open(OCCUPANCY_STATE_FILE) as f:
            state = json.load(f)
            platform_state.update(state.get("platform_state", {}))
            route_state.update(state.get("route_state", {}))


@app.on_event("startup")
async def startup_event():
    load_occupancy_state()
    asyncio.create_task(train_timing_monitor())


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    websocket_clients.add(websocket)
    print("[WS] Client connected")

    try:
        while True:
            await asyncio.sleep(1)  # No incoming event handling, only pushing
    except WebSocketDisconnect:
        websocket_clients.discard(websocket)
        print("[WS] Client disconnected")


@app.get("/")
def read_root():
    return {"msg": "Backend running"}


@app.get("/getPlatformAssigned")
async def get_platform_assigned(train_number: str):
    # Gather context for AI agent
    train = train_state.get(train_number)
    context = {
        "train": train,
        "platform_state": platform_state,
        # Add more context as needed
    }
    decision = await ask_ollama(context)
    # Update state
    platform_no = decision.get("platform_no")
    if platform_no:
        platform_state[platform_no] = train_number
        if train_number in train_state:
            train_state[train_number]["platform_no"] = platform_no
        save_occupancy_state()
    return decision


@app.post("/routeClearence")
async def route_clearence(request: Request):
    data = await request.json()
    train_number = data["train_number"]
    platform_no = data["platform_no"]
    # Gather context for AI agent
    context = {
        "train": train_state.get(train_number),
        "platform_no": platform_no,
        "route_state": route_state,
        # Add more context as needed
    }
    decision = await ask_ollama(context)
    # Update state
    route_id = decision.get("route_id")
    if route_id:
        route_state[route_id] = train_number
        if train_number in train_state:
            train_state[train_number]["route_id"] = route_id
        save_occupancy_state()
    return decision


@app.post("/routeOccupancy")
async def route_occupancy(request: Request):
    data = await request.json()
    route_id = data["route_id"]
    train_number = data["train_number"]
    # Mark route as occupied
    route_state[route_id] = train_number
    save_occupancy_state()
    return {"status": "occupied", "route_id": route_id, "train_number": train_number}
