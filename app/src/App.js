import React from 'react';
// import components
import GameContainer from './components/GameContainer';
import PresetsContainer from './components/PresetsContainer';
import RulesContainer from './components/RulesContainer';
// import styles
import './App.css';

function App() {
  return (
    <div className="app">
     <h1>Game of Life</h1>
     
     <GameContainer />

     <PresetsContainer />

     <RulesContainer />
    
    </div>
  );
}

export default App;
