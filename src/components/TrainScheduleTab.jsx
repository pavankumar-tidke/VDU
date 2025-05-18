import React, { useState, useEffect } from "react";
import CustomTable from "./CustomTable";

function TrainScheduleTab() {
  const [schedule, setSchedule] = useState([]);
  useEffect(() => {
    fetch("/train_schedule copy 2.json")
      .then((res) => res.json())
      .then(setSchedule);
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "train_name",
      align: "left",
      colStyle: { minWidth: 120, maxWidth: 180 },
    },
    {
      title: "Number",
      dataIndex: "train_number",
      align: "center",
      colStyle: { minWidth: 60, maxWidth: 80 },
    },
    {
      title: "Type",
      dataIndex: "type",
      align: "center",
      colStyle: { minWidth: 60, maxWidth: 80 },
    },
    {
      title: "Direction",
      dataIndex: "direction",
      align: "center",
      colStyle: { minWidth: 60, maxWidth: 80 },
    },
    {
      title: "Start",
      dataIndex: "start_time",
      align: "center",
      colStyle: { minWidth: 60, maxWidth: 80 },
    },
    {
      title: "Stop (s)",
      dataIndex: "stop_time",
      align: "center",
      colStyle: { minWidth: 60, maxWidth: 80 },
    },
    {
      title: "Depart",
      dataIndex: "departure_time",
      align: "center",
      colStyle: { minWidth: 60, maxWidth: 80 },
    },
    {
      title: "Coaches",
      dataIndex: "coach_count",
      align: "center",
      colStyle: { minWidth: 60, maxWidth: 80 },
    },
    {
      title: "Days",
      dataIndex: "days_of_week",
      align: "center",
      colStyle: { minWidth: 90, maxWidth: 120 },
      render: (val) => (val ? val.join(", ") : ""),
    },
    {
      title: "Entry",
      dataIndex: "entry_segment",
      align: "center",
      colStyle: { minWidth: 60, maxWidth: 80 },
    },
  ];

  return (
    <div>
      <CustomTable columns={columns} data={schedule} />
    </div>
  );
}

export default TrainScheduleTab;
