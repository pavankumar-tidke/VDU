import React from "react";
import { Stage, Layer, Line, Text, Rect } from "react-konva";
import Tracks from "./Tracks";
import Signals from "./Signals";
import TrainOnTrack from "./TrainOnTrack";
import ArrivingTrain from "./ArrivingTrain";

// Constants for grid
const CM_TO_PX = 40; // 1cm = 40px (adjust as needed for your display)
const GRID_SIZE_CM = 0.5;
const GRID_SIZE_PX = CM_TO_PX * GRID_SIZE_CM; // 20px per 0.5cm
const COL_START = -5;
const COL_END = 300;
const ROW_START = -8;
const ROW_END = 30;
const WIDTH = (COL_END - COL_START + 1) * GRID_SIZE_PX;
const HEIGHT = (ROW_END - ROW_START + 1) * GRID_SIZE_PX;

function toCanvasCoords([x, y]) {
  // Convert grid coordinates to canvas pixel coordinates
  return [(x - COL_START) * GRID_SIZE_PX, (y - ROW_START) * GRID_SIZE_PX];
}

function Grid({ arrivingTrains = [] }) {
  const lines = [];
  // Vertical lines
  for (let col = COL_START; col <= COL_END; col++) {
    const x = (col - COL_START) * GRID_SIZE_PX;
    lines.push(
      <Line
        key={`v-${col}`}
        points={[x, 0, x, HEIGHT]}
        stroke="#444"
        strokeWidth={0.5}
      />
    );
    // Column numbering (every 5th column)
    // if (col % 5 === 0) {
    lines.push(
      <Text
        key={`col-label-${col}`}
        x={x + 2}
        y={2}
        text={col.toString()}
        fontSize={12}
        fill="#888"
      />
    );
    // }
  }
  // Horizontal lines
  for (let row = ROW_START; row <= ROW_END; row++) {
    const y = (row - ROW_START) * GRID_SIZE_PX;
    lines.push(
      <Line
        key={`h-${row}`}
        points={[0, y, WIDTH, y]}
        stroke="#444"
        strokeWidth={0.5}
      />
    );
    // Row numbering (every 2nd row)
    if (row % 2 === 0) {
      lines.push(
        <Text
          key={`row-label-${row}`}
          x={2}
          y={y + 2}
          text={row.toString()}
          fontSize={12}
          fill="#888"
        />
      );
    }
  }

  return (
    <Stage
      width={WIDTH}
      height={HEIGHT}
      style={{ background: "black", display: "block", margin: "0 auto" }}
    >
      <Layer>
        {/* Black background */}
        <Rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="black" />
        {lines}
      </Layer>
      <Layer>
        <Tracks />
      </Layer>
      <Layer>
        <Signals />
      </Layer>
      <Layer>
        <TrainOnTrack />
      </Layer>
      {/* Render all arriving trains from prop */}
      <Layer>
        {arrivingTrains.map((train, idx) => (
          <ArrivingTrain key={train.train_number + "-" + idx} train={train} />
        ))}
      </Layer>
    </Stage>
  );
}

export default Grid;
