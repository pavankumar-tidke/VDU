import httpx
import os

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")
MODEL = os.getenv("OLLAMA_MODEL", "llama2")  # or "mistral", etc.


async def ask_ollama(context):
    prompt = f"""
    You are a train station AI agent. Here is the context:
    {context}
    Decide the best platform and route for the arriving train. Respond in JSON with keys: platform, route, reason.
    """
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{OLLAMA_URL}/api/generate",
            json={"model": MODEL, "prompt": prompt, "stream": False},
        )
        result = response.json()
        # Parse the LLM's response (should be JSON)
        try:
            import json

            return json.loads(result["response"])
        except Exception:
            return {"error": "Invalid response from LLM", "raw": result["response"]}
