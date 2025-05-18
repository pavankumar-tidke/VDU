import React from "react";
import styles from "../styles/ControlPanel.module.css";

function RoutesTab() {
  // Placeholder: In future, fetch and display live route locking/unlocking, train on route, etc.
  return (
    <div className={styles.tableWrapper}>
      <h3 className={styles.heading}>Routes (Live)</h3>
      <div style={{ color: "#aaa", marginTop: 24 }}>
        Live route status, locking/unlocking, and train-on-route info will
        appear here.
      </div>
    </div>
  );
}

export default RoutesTab;
