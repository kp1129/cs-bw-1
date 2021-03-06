import React, { useState, useCallback, useRef, useEffect } from "react";

const GameContainer = ({speed}) => {
  // set the size of the grid
  const numRows = 25;
  const numCols = 25;
  const [resetFlag, setResetFlag] = useState(0);

  const generateBlankGrid = () => {
    // initialize the grid
    const rows = [];
    console.log(numRows);
    for (let i = 0; i < numRows; i++) {
      // create array of length = numCols
      // fill it with 0s because at this point
      // no cells are alive
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  }

  const generateRandomGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => Math.random() > .5 ? 1 : 0));
    }
    return rows;
  }

  const [grid, setGrid] = useState(generateBlankGrid());
  const [genCounter, setGenCounter] = useState(0);
 

  // this handler allows the user to toggle
  // individual cell state
  const handleCellClick = (i, j) => {
    setGrid([...grid], (grid[i][j] = grid[i][j] ? 0 : 1));
  };

  const [start, setStart] = useState(false);
  const [step, setStep] = useState(false);

  const startRef = useRef(start);
  startRef.current = start;

  const gridRef = useRef(grid);
  gridRef.current = grid;

  const speedRef = useRef(speed);
  speedRef.current = speed;

  const stepRef = useRef(step);
  stepRef.current = step;  

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
    if (!startRef.current && !stepRef.current){
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

    if(startRef.current){
      setTimeout(simulate, speedRef.current);
    }
    

  }, [resetFlag])

  const handleStartButton = () => {
    setStart(!start);
    if(!start){
        startRef.current = true;
        simulate();
    }
  }

  const handleStepButton = () => {
    setStep(true);
    stepRef.current = true;
    simulate();
    setStep(false);
    stepRef.current = false;
    let newGenCounter = genCounter + 1;
    setGenCounter(newGenCounter);
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

     <div style={{
        display: "grid", 
        gridTemplateColumns: `repeat(${numCols}, 1.5rem)`
      }}>
        {grid.map((row, i) =>
          row.map((col, j) => (
            <div
              className={grid[i][j] ? "cell alive" : "cell"}
              key={`${i}-${j}`}
                // if simulation is running, onClick won't do anything
              onClick={start ? undefined : () => handleCellClick(i, j)}
            />
          ))
        )}
      </div>

      <button onClick={handleStepButton} type="button">step</button>        
      <button onClick={handleStartButton} type="button">
        {start ? "pause" : "start"}
      </button>
      <button onClick={() => {
          let incrementFlag = resetFlag + 1
          setResetFlag(incrementFlag);
          setStart(false);
          startRef.current = false;
          setGenCounter(0);
          setGrid(generateBlankGrid());
      }} type="button">reset</button>
      <button onClick={() => {
        let incrementFlag = resetFlag + 1;
        setResetFlag(incrementFlag);
        setGrid(generateRandomGrid());
        }} type="button">random</button>       
    </div>
  );
};

export default GameContainer;
