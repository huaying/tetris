## React Tetris Component

<img width="365" alt="Screen Shot 2019-11-16 at 1 07 07 AM" src="https://user-images.githubusercontent.com/3991678/68961666-d5a24500-080d-11ea-95a2-065d8c4ee5cc.png">

### Usage
```jsx
import React from "react";
import Tetris from "@huaying/tetris";

const App = () => (
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
);

export default App;
```
