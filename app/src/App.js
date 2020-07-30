import React, {useState} from 'react';
// import components
import GameContainer from './components/GameContainer';
import PresetsContainer from './components/PresetsContainer';
import RulesContainer from './components/RulesContainer';

// import styles
import './App.css';

const App = () => {

  const [speed, setSpeed] = useState(1000)

  

  return (
    <div className="app">
      
     <h1>Game of Life</h1>
     
     <GameContainer speed={speed}/>

     <div className="right">

     <RulesContainer />

      <PresetsContainer setSpeed={setSpeed} />

      

     </div>

    </div>
  );
}

export default App;
