import React from "react";
import styles from "../styles/ControlPanel.module.css";

function LiveTrainsTab() {
  // Placeholder: In future, fetch and display live train data from VDU
  return (
    <div className={styles.tableWrapper}>
      <h3 className={styles.heading}>Live Trains</h3>
      <div style={{ color: "#aaa", marginTop: 24 }}>
        Live train positions, speed, and status will appear here.
      </div>
    </div>
  );
}

export default LiveTrainsTab;
