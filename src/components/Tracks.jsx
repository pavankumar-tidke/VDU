import React, { useState } from "react";
import { Line, Text } from "react-konva";
import TRACKS_CONFIG from "../data/tracks";

// Constants for grid (should match Grid.jsx)
const CM_TO_PX = 40;
const GRID_SIZE_CM = 0.5;
const GRID_SIZE_PX = CM_TO_PX * GRID_SIZE_CM;
const COL_START = -5;
const ROW_START = -8;
// const DEFAULT_TRACK_COLOR = "#00910a";
const DEFAULT_TRACK_COLOR = "#005212";
const SELECTED_TRACK_COLOR = "#FFD600";
const TRACK_ID_FONT_SIZE = 10;
const TRACK_ID_COLOR = "#42f5d7";

function toCanvasCoords([x, y]) {
  return [(x - COL_START) * GRID_SIZE_PX, (y - ROW_START) * GRID_SIZE_PX];
}

const LABEL_OFFSET = 12; // px above the line

const Tracks = ({ onSelectionChange }) => {
  const [selected, setSelected] = useState([]); // array of selected track_ids

  const handleTrackClick = (track_id) => {
    setSelected((prev) => {
      let newSelected;
      if (prev.includes(track_id)) {
        newSelected = prev.filter((id) => id !== track_id);
      } else {
        newSelected = [...prev, track_id];
      }
      if (onSelectionChange) onSelectionChange(newSelected);
      return newSelected;
    });
  };

  return TRACKS_CONFIG.map((track, idx) => {
    const [x1, y1] = toCanvasCoords(track.start);
    const [x2, y2] = toCanvasCoords(track.end);
    // Midpoint for label
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2 - LABEL_OFFSET;
    const isSelected = selected.includes(track.track_id);
    return (
      <React.Fragment key={`${track.track_id}-${idx}`}>
        <Line
          key={`${track.track_id}-${idx}`}
          id={track.track_id}
          points={[x1, y1, x2, y2]}
          stroke={isSelected ? SELECTED_TRACK_COLOR : DEFAULT_TRACK_COLOR}
          strokeWidth={6}
          lineCap="butt"
          lineJoin="miter"
          onClick={() => handleTrackClick(track.track_id)}
          onTap={() => handleTrackClick(track.track_id)}
        />
        <Text
          x={mx - 20}
          y={my - 8}
          text={track.track_id}
          fontSize={TRACK_ID_FONT_SIZE}
          fill={TRACK_ID_COLOR}
          fontStyle="bold"
          align="center"
          width={40}
        />
      </React.Fragment>
    );
  });
};

export default Tracks;
