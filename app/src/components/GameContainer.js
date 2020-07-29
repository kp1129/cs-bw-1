import React, { useState, useCallback, useRef, useEffect } from "react";

const GameContainer = () => {
  // set the size of the grid
  const numRows = 25;
  const numCols = 25;

  const generateGrid = () => {
    // initialize the grid
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      // create array of length = numCols
      // fill it with 0s because at this point
      // no cells are alive
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  }

  const [grid, setGrid] = useState(generateGrid());
  const [genCounter, setGenCounter] = useState(0);

  // this handler allows the user to toggle
  // individual cell state
  const handleCellClick = (i, j) => {
    setGrid([...grid], (grid[i][j] = grid[i][j] ? 0 : 1));
  };

  const [start, setStart] = useState(false);

  const startRef = useRef(start);
  startRef.current = start;

  const operations = [
      [0, 1],
      [0, -1],
      [1, -1],
      [-1, -1],
      [1, 1],
      [-1, 1],
      [1, 0],
      [-1, 0]
    ];

  const simulate = useCallback(() => {
    if (!startRef.current){
        return;
    } 
    // simulation logic
    
    // create copy of old grid
    let newGrid = [...grid];
    // iterate over current grid to 
    // determine cell states for newGrid
    for(let i = 0; i < numRows; i++){
        for(let j = 0; j < numCols; j++){
            let neighbors = 0;
            operations.forEach(([x, y]) => {
                const newI = i + x;
                const newJ = j + y;
                if(newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols){
                    neighbors += grid[newI][newJ]
                }
            })

            if (neighbors < 2 || neighbors > 3){
                newGrid[i][j] = 0;
            } else if (grid[i][j] === 0 && neighbors === 3){
                newGrid[i][j] = 1;
            }
          
        }
    }
   
    // newGrid is ready to display
    setGrid(newGrid);

    setTimeout(() => {
   
        simulate();
        
    }, 1000);

  }, [])

  const handleStartButton = () => {
    setStart(!start);
    if(!start){
        startRef.current = true;
        simulate();
    }
  }

  useEffect(() => {
    if(startRef.current){
        let newGenCounter = genCounter + 1;
        setGenCounter(newGenCounter);
    }
    
  }, [grid])

  return (
    <div className="game-container">
      <h2>Generation: {genCounter}</h2>

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

      <button onClick={handleStartButton} type="button">
        {start ? "pause" : "start"}
      </button>
      <button type="button">clear the grid</button>
    </div>
  );
};

export default GameContainer;
