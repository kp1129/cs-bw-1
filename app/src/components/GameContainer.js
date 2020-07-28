import React, { useState, useCallback, useRef } from "react";
import Cell from "./Cell";

const GameContainer = () => {
  // set the size of the grid
  const numRows = 25;
  const numCols = 25;

  const [grid, setGrid] = useState(() => {
    // initialize the grid
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      // create array of length = numCols
      // fill it with 0s because at this point
      // no cells are alive
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });

  // this handler allows the user to toggle
  // individual cell state
  const handleCellClick = (i, j) => {
    setGrid([...grid], (grid[i][j] = !grid[i][j]));
  };

  const [start, setStart] = useState(false);

  const startRef = useRef(start);
  startRef.current = start;

  const simulate = useCallback(() => {
    if (!startRef.current){
        return;
    }

    setTimeout(simulate, 1000);
  }, [])
  return (
    <div className="game-container">
      <h2>Generation: 0</h2>

      <div className="grid-container">
        {grid.map((row, i) =>
          row.map((col, j) => (
            <div
              className="cell"
              key={`${i}-${j}`}
                // if simulation is running, onClick won't do anything
              onClick={start ? undefined : () => handleCellClick(i, j)}
              style={{
                // cell color will depend on whether it's alive or dead
                // so it will be set dynamically
                backgroundColor: grid[i][j] ? "darkolivegreen" : undefined,
              }}
            />
          ))
        )}
      </div>

      <button onClick={() => setStart(!start)} type="button">
        {start ? "pause" : "start"}
      </button>
      <button type="button">clear the grid</button>
    </div>
  );
};

export default GameContainer;
