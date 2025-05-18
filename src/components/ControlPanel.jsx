import React, { useState } from "react";
import styles from "../styles/ControlPanel.module.css";
import { motion } from "framer-motion";
import TrainScheduleTab from "./TrainScheduleTab";
import RoutesTab from "./RoutesTab";
import LiveTrainsTab from "./LiveTrainsTab";

const closeBtnStyle = {
  position: "absolute",
  top: 10,
  right: 16,
  background: "linear-gradient(135deg, #4fc3f7 0%, #1976d2 100%)",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: 32,
  height: 32,
  fontSize: 18,
  boxShadow: "0 2px 8px #0005, 0 1.5px 4px #1976d299",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "box-shadow 0.2s, transform 0.15s, background 0.2s",
  outline: "none",
  zIndex: 1101,
};

const ControlPanel = ({ open, onClose }) => {
  const [tab, setTab] = useState("schedule");
  if (!open) return null;
  return (
    <div className={styles.panel} style={{ padding: "0" }}>
      
      <div className={styles.tabs}>
        <button
          className={
            tab === "schedule"
              ? styles.activeTab + " " + styles.tab
              : styles.tab
          }
          onClick={() => setTab("schedule")}
        >
          Train Schedule
        </button>
        <button
          className={
            tab === "routes" ? styles.activeTab + " " + styles.tab : styles.tab
          }
          onClick={() => setTab("routes")}
        >
          Routes
        </button>
        <button
          className={
            tab === "live" ? styles.activeTab + " " + styles.tab : styles.tab
          }
          onClick={() => setTab("live")}
        >
          Live Trains
        </button>
      </div>
      <div className={styles.tabContent}>
        {tab === "schedule" && <TrainScheduleTab />}
        {tab === "routes" && <RoutesTab />}
        {tab === "live" && <LiveTrainsTab />}
      </div>
    </div>
  );
};

export default ControlPanel;
