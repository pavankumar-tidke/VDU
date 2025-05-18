import React from "react";
import styles from "../styles/ControlPanel.module.css";

function CustomTable({ columns, data }) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <colgroup>
          {columns.map((col, i) => (
            <col key={i} style={col.colStyle || {}} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} className={styles.th}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={row.id || i}
              className={i % 2 === 0 ? styles.stripedRow : styles.altRow}
            >
              {columns.map((col, j) => (
                <td
                  key={j}
                  className={
                    styles.td +
                    " " +
                    (col.align === "center"
                      ? styles.centerTd
                      : col.align === "left"
                      ? styles.leftTd
                      : "")
                  }
                  title={row[col.dataIndex]}
                >
                  {col.render
                    ? col.render(row[col.dataIndex], row, i)
                    : row[col.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomTable;
