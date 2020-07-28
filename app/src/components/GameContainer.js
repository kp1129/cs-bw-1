import React, {useState} from 'react';
import Cell from './Cell';

const GameContainer = () => {
    // set the size of the grid
    const numRows = 25;
    const numCols = 25;
    
    const [grid, setGrid] = useState(() => {
        // initialize the grid
        const rows = [];
        for(let i = 0; i < numRows; i++){
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
        setGrid([...grid], grid[i][j] = !grid[i][j])
    }

    return (
        <div className="game-container">
            <h2>Generation: 0</h2>

            <div className="grid-container">
                {grid.map((row, i) => row.map((col, j) => (
                        <div className="cell" 
                        key={`${i}-${j}`}
                        onClick={() => handleCellClick(i, j)}
                        style={{
                            // cell color will depend on whether it's alive or dead
                            // so it will be set dynamically
                            backgroundColor: grid[i][j] ? "darkolivegreen" : undefined
                        }} />
                    ))
                    )}
            </div>

            
            <button type="button">start</button>
            <button type="button">pause</button>
            <button type="button">stop/clear</button>

        </div>
    )
}

export default GameContainer;