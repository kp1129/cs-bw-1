import React from "react";

const RulesContainer = () => {
  return (
    <div className="rules-container">
      <h3>Rules</h3>
      <p>
        The Game of Life is a cellular automaton devised by the British
        mathematician John Conway.
      </p>
      <ul>
        <li>Each cell on the grid interacts with its 8 neighbors</li>
        <li>
          Any live cell with fewer than 2 live neighbors dies (underpopulation)
        </li>        
        <li>
          Any live cell with more than 3 live neighbors dies (overpopulation)
        </li>
        <li>
          Any dead cell with exactly 3 live neighbors becomes a live cell
          (reproduction)
        </li>
        <li>
          Any live cell with 2 or 3 live neighbors lives on to the next
          generation
        </li>
      </ul>
    </div>
  );
};

export default RulesContainer;
