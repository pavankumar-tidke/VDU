import React, { useState, useEffect } from "react";
import Grid from "./components/Grid";
import ControlPanel from "./components/ControlPanel";
import { motion } from "framer-motion";

const panelBtnStyle = {
  position: "fixed",
  top: 24,
  right: 24,
  zIndex: 1100,
  background: "linear-gradient(135deg, #4fc3f7 0%, #1976d2 100%)",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  padding: "10px 10px",
  fontSize: 28,
  boxShadow: "0 4px 16px #0005, 0 1.5px 4px #1976d299",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "box-shadow 0.2s, transform 0.15s, background 0.2s",
  outline: "none",
};

function App() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [arrivingTrains, setArrivingTrains] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws");
    ws.onopen = () => {
      console.log("WebSocket connected");
    };
    ws.onmessage = (event) => {
      try {
        const train_info = JSON.parse(event.data);
        console.log("WS message:", train_info);
        let train_data = train_info?.train_info;
        // If the backend sends a single train object
        if (train_data.train_number && train_data.entry_segment) {
          console.log("Train data:", train_data);
          setArrivingTrains((prev) => {
            if (prev.some((t) => t.train_number === train_data.train_number))
              return prev;
            return [...prev, train_data];
          });
        }
      } catch (e) {
        console.log("WS message (raw):", event.data);
      }
    };
    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };
    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };
    return () => ws.close();
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        overflow: "auto",
      }}
    >
      <motion.button
        style={panelBtnStyle}
        onClick={() => setPanelOpen((open) => !open)}
        title={panelOpen ? "Close Control Panel" : "Open Control Panel"}
        aria-label={panelOpen ? "Close Control Panel" : "Open Control Panel"}
        whileHover={{
          scale: 1.12,
          boxShadow: "0 8px 24px #1976d299, 0 2px 8px #0007",
        }}
        // whileTap={{ scale: 0.96 }}
      >
        {panelOpen ? (
          // Close (X) icon
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2"
              y="6"
              width="10"
              height="2"
              rx="1"
              transform="rotate(45 2 6)"
              fill="white"
            />
            <rect
              x="6"
              y="12"
              width="10"
              height="2"
              rx="1"
              transform="rotate(-45 6 12)"
              fill="white"
            />
          </svg>
        ) : (
          // Menu icon (3 horizontal lines)
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="6" width="10" height="3.2" rx="1.6" fill="white" />
            <rect y="12.4" width="10" height="3.2" rx="1.6" fill="white" />
            <rect y="18.8" width="10" height="3.2" rx="1.6" fill="white" />
          </svg>
        )}
      </motion.button>

      <ControlPanel open={panelOpen} onClose={() => setPanelOpen(false)} />

      <Grid arrivingTrains={arrivingTrains} />
    </div>
  );
}

export default App;
