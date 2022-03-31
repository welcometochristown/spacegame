import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import "./App.css";
import Game from "./game/Game";

const App: React.FC = () => {
  return (
    <div className="App">
      <Game />
    </div>
  );
};

export default App;
