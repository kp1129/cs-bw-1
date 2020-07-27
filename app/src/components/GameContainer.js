import React from 'react';

const GameContainer = () => {
    return (
        <div className="game-container">
            <h2>Generation: 0</h2>

            {/* grid container */}

            
            <button type="button">start</button>
            <button type="button">pause</button>
            <button type="button">stop/clear</button>

        </div>
    )
}

export default GameContainer;