import React, { useState } from "react";
import useGameLoop from "../hooks/useGameLoop";
import useRenderer from "../hooks/useRenderer";
import { range } from "../utils/util";
import { ICoordinate, IGalaxy, IPlanet } from "./Interfaces";
import Startup from "./Startup";

const getRandom = (max: number): number => {
  return Math.floor(Math.random() * max) + 1;
};

const getRandomCoordinates = (count: number, size: number): ICoordinate[] => {
  const coords: ICoordinate[] = [];

  for (var i = 0; i < size; i++) {
    var isUnique = false;
    var x = 0;
    var y = 0;

    while (!isUnique) {
      x = getRandom(size);
      y = getRandom(size);

      isUnique = !coords.some((n) => n.x === x && n.y === y);
    }
    coords.push({ x, y });
  }

  return coords;
};

const generateGalaxy = (
  planets: number = 10,
  galaxySize: number = 10
): IGalaxy => {
  const cords = getRandomCoordinates(planets, galaxySize);
  return {
    size: galaxySize,
    planets: range(planets).map((index) => ({
      name: `Planet${index}`,
      galaxyCoordinate: cords[index],
    })),
  };
};

const fps = 1000 / 60;

const Game: React.FC = () => {
  const [playerName, setPlayerName] = useState<string | undefined>();

  const { render } = useRenderer();

  const { isRunning, startGameLoop, stopGameLoop } = useGameLoop(() => {
    console.log("game loop");
  }, fps);

  const handleStartGame = (playerName: string) => {
    setPlayerName(playerName);
    startGameLoop();
  };

  // if (!isRunning) {
  //   return <Startup onStart={handleStartGame} />;
  // }

  const galaxy = generateGalaxy();

  return <>{render(galaxy)}</>;
};

export default Game;
