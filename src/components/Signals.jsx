import React, { useState, useRef } from "react";
import { Rect, Circle, Text, Group, Line, Label, Tag } from "react-konva";
import SIGNALS_CONFIG from "../data/signals";

// Constants for grid (should match Grid.jsx)
const CM_TO_PX = 40;
const GRID_SIZE_CM = 0.5;
const GRID_SIZE_PX = CM_TO_PX * GRID_SIZE_CM;
const COL_START = -5;
const ROW_START = -8;

function toCanvasCoords(x, y) {
  return [(x - COL_START) * GRID_SIZE_PX, (y - ROW_START) * GRID_SIZE_PX];
}

// Map aspect names to colors
const ASPECT_COLORS = {
  red: "#ff0800",
  yellow: "#fffb00",
  green: "#22ff00",
  "d.yellow": "#fffb00",
};
const ASPECT_OFF_COLOR = "#222";

const SIGNAL_ASPECT_RADIUS = 4;
const SIGNAL_ASPECT_SPACING = 10;
const SIGNAL_HEIGHT = 11;
const SIGNAL_WIDTH_MIN = 15;
const SIGNAL_POLE_HEIGHT = 20;
const SIGNAL_LABEL_OFFSET = 8;

const Tooltip = ({
  x,
  y,
  signal,
  currentAspect,
  onAspectChange,
  onHover,
  onUnhover,
}) => {
  // Compose details string
  const details = [
    `ID: ${signal.signal_id}`,
    `Direction: ${signal.direction_to_control}`,
    `Position: ${signal.position}`,
    `Aspects: ${signal.aspects.join(", ")}`,
    `Current: ${currentAspect}`,
    `Protects: ${(signal.protects_segments || []).join(", ")}`,
  ];
  // Tooltip width/height
  const width = 170;
  const height = 90;
  return (
    <Group
      x={x + 15}
      y={y - height / 2}
      onMouseEnter={onHover}
      onMouseLeave={onUnhover}
      onTouchStart={onHover}
      onTouchEnd={onUnhover}
    >
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="#333"
        stroke="#888"
        strokeWidth={2}
        cornerRadius={8}
        shadowColor="#000"
        shadowBlur={8}
        shadowOffset={{ x: 2, y: 2 }}
        shadowOpacity={0.3}
      />
      <Text
        text={details.join("\n")}
        fontSize={12}
        fill="#fff"
        padding={8}
        width={width}
        height={height - 30}
      />
      {/* Aspect selector */}
      <Group x={10} y={height - 30}>
        <Text text="Set Aspect:" fontSize={12} fill="#fff" y={0} />
        {signal.aspects.map((asp, idx) => (
          <Circle
            key={asp}
            x={70 + idx * 18}
            y={10}
            radius={7}
            fill={ASPECT_COLORS[asp] || "#888"}
            stroke={currentAspect === asp ? "#fff" : "#444"}
            strokeWidth={currentAspect === asp ? 2 : 1}
            onClick={() => onAspectChange(asp)}
            onTap={() => onAspectChange(asp)}
            shadowForStrokeEnabled={false}
            style={{ cursor: "pointer" }}
          />
        ))}
      </Group>
    </Group>
  );
};

const Signals = () => {
  // State: current aspect for each signal_id
  const [signalAspects, setSignalAspects] = useState(() => {
    const initial = {};
    for (const s of SIGNALS_CONFIG) {
      // Default: red if present, else first aspect
      initial[s.signal_id] = s.aspects.includes("red") ? "red" : s.aspects[0];
    }
    return initial;
  });
  // Tooltip state
  const [hovered, setHovered] = useState(null); // { signal, x, y }
  const hoverTimeout = useRef();

  // For future: function to set aspect for a signal
  const setSignalAspect = (signal_id, aspect) =>
    setSignalAspects((a) => ({ ...a, [signal_id]: aspect }));

  // Helper to handle hover for all parts of a signal
  const handleHover = (signal, cx, rectY) => {
    clearTimeout(hoverTimeout.current);
    setHovered({ signal, x: cx, y: rectY });
  };
  const handleUnhover = () => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setHovered(null), 120);
  };

  return SIGNALS_CONFIG.map((signal) => {
    const [cx, cy] = toCanvasCoords(signal.x, signal.y);
    const numAspects = signal.num_aspects || signal.aspects.length;
    const width = Math.max(
      SIGNAL_WIDTH_MIN,
      numAspects * SIGNAL_ASPECT_SPACING
    );
    const height = SIGNAL_HEIGHT;
    const rectX = cx - width / 2;
    const rectY = signal.position === "above" ? cy - height : cy;
    // Stand/pole direction logic
    let poleStart = { x: cx, y: cy };
    let poleEnd = { x: cx, y: cy };
    if (signal.direction_to_control === "right") {
      poleStart = { x: rectX, y: rectY + height / 2 };
      poleEnd = { x: rectX - SIGNAL_POLE_HEIGHT, y: rectY + height / 2 };
    } else if (signal.direction_to_control === "left") {
      poleStart = { x: rectX + width, y: rectY + height / 2 };
      poleEnd = {
        x: rectX + width + SIGNAL_POLE_HEIGHT,
        y: rectY + height / 2,
      };
    } else if (
      signal.direction_to_control === "up" ||
      signal.direction_to_control === "above"
    ) {
      poleStart = { x: cx, y: rectY };
      poleEnd = { x: cx, y: rectY - SIGNAL_POLE_HEIGHT };
    } else if (
      signal.direction_to_control === "down" ||
      signal.direction_to_control === "below"
    ) {
      poleStart = { x: cx, y: rectY + height };
      poleEnd = { x: cx, y: rectY + height + SIGNAL_POLE_HEIGHT };
    } else {
      // Default: below
      poleStart = { x: cx, y: rectY + height };
      poleEnd = { x: cx, y: rectY + height + SIGNAL_POLE_HEIGHT };
    }
    // Label
    const labelY =
      signal.position === "above"
        ? rectY - SIGNAL_LABEL_OFFSET - 12
        : rectY + height + SIGNAL_LABEL_OFFSET;

    // Reverse aspects for right-facing signals
    const aspects =
      signal.direction_to_control === "right"
        ? [...signal.aspects].reverse()
        : signal.aspects;
    const currentAspect = signalAspects[signal.signal_id];

    return (
      <Group
        key={signal.signal_id}
        onMouseEnter={() => handleHover(signal, cx, rectY)}
        onMouseLeave={handleUnhover}
        onTouchStart={() => handleHover(signal, cx, rectY)}
        onTouchEnd={handleUnhover}
      >
        {/* Stand/pole */}
        <Line
          points={[poleStart.x, poleStart.y, poleEnd.x, poleEnd.y]}
          stroke="#888"
          strokeWidth={3}
        />
        {/* Signal rectangle */}
        <Rect
          x={rectX}
          y={rectY}
          width={width}
          height={height}
          fill="#222"
          stroke="#888"
          strokeWidth={1.5}
          cornerRadius={3}
        />
        {/* Signal aspect circles */}
        {aspects.map((aspect, idx) => (
          <Circle
            key={aspect + idx}
            x={rectX + SIGNAL_ASPECT_SPACING / 2 + idx * SIGNAL_ASPECT_SPACING}
            y={rectY + height / 2}
            radius={SIGNAL_ASPECT_RADIUS}
            fill={
              currentAspect === aspect
                ? ASPECT_COLORS[aspect] || "#888"
                : ASPECT_OFF_COLOR
            }
            stroke="#111"
            strokeWidth={1}
          />
        ))}
        {/* Signal ID label */}
        <Text
          x={cx - width / 2}
          y={labelY}
          text={signal.signal_id}
          fontSize={12}
          fill="#fff"
          fontStyle="bold"
          align="center"
          width={width}
        />
        {/* Tooltip (only for hovered signal) */}
        {hovered && hovered.signal.signal_id === signal.signal_id && (
          <Tooltip
            x={cx}
            y={rectY}
            signal={signal}
            currentAspect={currentAspect}
            onAspectChange={(asp) => setSignalAspect(signal.signal_id, asp)}
            onHover={() => handleHover(signal, cx, rectY)}
            onUnhover={handleUnhover}
          />
        )}
      </Group>
    );
  });
};

export default Signals;
