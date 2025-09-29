// src/components/PositionSelector.jsx
import React from "react";

const PositionSelector = ({ positions, onSelect }) => {
  return (
    <div>
      <h2>Select a Position</h2>
      <ul>
        {positions.map(pos => (
          <li key={pos}>
            <button onClick={() => onSelect(pos)}>{pos}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PositionSelector;
