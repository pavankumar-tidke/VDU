import React, { useState } from "react";
import { Group, Rect, Text, Label, Tag } from "react-konva";

// T-144: ((126, 15), (146, 15)) from tracks_config.py
const T144_START = { x: 126, y: 15 };
const T144_END = { x: 146, y: 15 };

// These must match Grid.jsx
const CM_TO_PX = 40;
const GRID_SIZE_CM = 0.5;
const GRID_SIZE_PX = CM_TO_PX * GRID_SIZE_CM;
const COL_START = -5;
const ROW_START = -8;

function toCanvasCoords({ x, y }) {
  return [(x - COL_START) * GRID_SIZE_PX, (y - ROW_START) * GRID_SIZE_PX];
}

const trainData = {
  train_number: "12345",
  train_name: "Sample Express",
  train_type: "Express",
  train_route: "T-144",
  current_position: "T-144",
  current_speed: 72, // km/h
  current_direction: "right",
  current_status: "Running",
};

export default function TrainOnTrack() {
  const [hovered, setHovered] = useState(false);

  // Rectangle size in px
  const width = 120; // 3 grid units
  const height = 32; // 0.8 grid units

  // Center of T-144 in grid
  const center = {
    x: (T144_START.x + T144_END.x) / 2,
    y: (T144_START.y + T144_END.y) / 2,
  };
  const [centerX, centerY] = toCanvasCoords(center);
  const rectX = centerX - width / 2;
  const rectY = centerY - height / 2;

  return (
    <Group>
      {/* Speed Indicator */}
      <Text
        x={centerX - width / 2}
        y={rectY - 18}
        text={`${trainData.current_speed} km/h`}
        fontSize={14}
        fill="green"
        width={width}
        align="center"
      />

      {/* Train Rectangle */}
      <Rect
        x={rectX}
        y={rectY}
        width={width}
        height={height}
        fill="#444"
        stroke="#fff"
        strokeWidth={2}
        cornerRadius={6}
        shadowBlur={hovered ? 8 : 2}
        shadowColor="#000"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />

      {/* Train Number */}
      <Text
        x={rectX}
        y={rectY + height / 2 - 12}
        width={width}
        height={24}
        text={trainData.train_number}
        fontSize={20}
        fill="#fff"
        align="center"
        verticalAlign="middle"
      />

      {/* Tooltip */}
      {hovered && (
        <Label x={centerX + width / 2 + 12} y={rectY - 8}>
          <Tag
            fill="#888"
            opacity={0.97}
            cornerRadius={8}
            shadowColor="#000"
            shadowBlur={8}
          />
          <Text
            text={
              `No: ${trainData.train_number}\n` +
              `Name: ${trainData.train_name}\n` +
              `Type: ${trainData.train_type}\n` +
              `Route: ${trainData.train_route}\n` +
              `Pos: ${trainData.current_position}\n` +
              `Speed: ${trainData.current_speed} km/h\n` +
              `Dir: ${trainData.current_direction}\n` +
              `Status: ${trainData.current_status}`
            }
            fontSize={14}
            fill="#fff"
            padding={10}
            width={200}
          />
        </Label>
      )}
    </Group>
  );
}
