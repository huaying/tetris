import React from "react";
import Tetris from "../lib";

const App = () => (
  <div className="app">
    <Tetris>
      {gameStart => (
        <div className="info">
          <span className="title"> Tetris </span>
          <span className="start" onClick={gameStart}>
            Start
          </span>
        </div>
      )}
    </Tetris>
  </div>
);

export default App;
