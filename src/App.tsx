import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Game from "./Game/Game";

const App: React.FC = () => {
  return (
    <div className="App">
      <Game />
    </div>
  );
};

export default App;
