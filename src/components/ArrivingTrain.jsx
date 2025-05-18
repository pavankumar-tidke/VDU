import React, { useEffect, useRef, useState } from "react";
import { Group, Rect, Text, Arrow } from "react-konva";
import TRACKS_CONFIG from "../data/tracks";

// Constants for grid (should match Grid.jsx)
const CM_TO_PX = 40;
const GRID_SIZE_CM = 0.5;
const GRID_SIZE_PX = CM_TO_PX * GRID_SIZE_CM;
const COL_START = -5;
const ROW_START = -8;

function toCanvasCoords([x, y]) {
  return [(x - COL_START) * GRID_SIZE_PX, (y - ROW_START) * GRID_SIZE_PX];
}

// Helper to interpolate between two points
function lerp(a, b, t) {
  return a + (b - a) * t;
}

function interpolateCoords(start, end, t) {
  return [lerp(start[0], end[0], t), lerp(start[1], end[1], t)];
}

export default function ArrivingTrain({ train, speed = 120 }) {
  // speed: px/sec (default: 120px/sec)
  const [progress, setProgress] = useState(0); // 0=start, 1=end
  const requestRef = useRef();

  // Find entry segment in TRACKS_CONFIG
  const entryTrack = TRACKS_CONFIG.find(
    (t) => t.track_id === train.entry_segment
  );
  if (!entryTrack) return null;
  const startPx = toCanvasCoords(entryTrack.start);
  const endPx = toCanvasCoords(entryTrack.end);

  // Calculate total distance in px
  const dx = endPx[0] - startPx[0];
  const dy = endPx[1] - startPx[1];
  const distance = Math.sqrt(dx * dx + dy * dy);
  const duration = distance / speed; // seconds

  // Animate progress from 0 to 1 with gradual stop (ease-out)
  useEffect(() => {
    let startTime;
    function easeOutQuad(t) {
      return t * (2 - t); // Ease-out quadratic
    }
    function animate(ts) {
      if (!startTime) startTime = ts;
      const elapsed = (ts - startTime) / 1000; // seconds
      let t = Math.min(elapsed / duration, 1);
      t = easeOutQuad(t); // Apply ease-out
      setProgress(t);
      if (t < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    }
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
    // eslint-disable-next-line
  }, [train.entry_segment, duration]);

  // Train rectangle size
  const width = 50;
  const height = 12;
  const [x, y] = interpolateCoords(startPx, endPx, progress);

  // Arrow for direction (at the front of the train)
  // Calculate direction vector
  const arrowLength = 24;
  const angle = Math.atan2(endPx[1] - startPx[1], endPx[0] - startPx[0]);
  // Arrow tip position (front of train)
  const arrowTipX = x + (width / 2) * Math.cos(angle);
  const arrowTipY = y + (width / 2) * Math.sin(angle);
  const arrowBaseX = arrowTipX - arrowLength * Math.cos(angle);
  const arrowBaseY = arrowTipY - arrowLength * Math.sin(angle);

  return (
    <Group>
      {/* Direction Arrow */}
      <Arrow
        points={[arrowBaseX, arrowBaseY, arrowTipX, arrowTipY]}
        pointerLength={8}
        pointerWidth={8}
        fill="#FFD600"
        stroke="#FFD600"
        strokeWidth={3}
        opacity={0.85}
      />
      {/* Train Rectangle */}
      <Rect
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
        fill="#444"
        stroke="#fff"
        strokeWidth={1.5}
        cornerRadius={3}
        shadowBlur={4}
        shadowColor="#000"
      />
      {/* Train Number */}
      <Text
        x={x - width / 2}
        y={y - 12}
        width={width}
        height={24}
        text={train.train_number}
        fontSize={10}
        fill="#fff"
        align="center"
        verticalAlign="middle"
      />
      {/* Status Text */}
      <Text
        x={x - width / 2}
        y={y + height / 2 + 6}
        width={width}
        height={20}
        text={progress < 1 ? "Arriving..." : "Waiting for clearance"}
        fontSize={10}
        fill={progress < 1 ? "#FFD600" : "#aaa"}
        align="center"
      />
    </Group>
  );
}
