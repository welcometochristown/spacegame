import { useState } from "react";
import { Timer, timer } from "d3";

const useGameLoop = (
  loopFunction: (elapsed: number) => void,
  delta: number
) => {
  const [gameTimer, setGameTimer] = useState<Timer>();
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const startGameLoop = () => {
    if (isRunning) {
      return;
    }
    if (gameTimer) {
      gameTimer.restart(loopFunction, delta);
    } else {
      setGameTimer(timer(loopFunction, delta));
    }
    setIsRunning(true);
  };

  const stopGameLoop = () => {
    if (gameTimer) {
      gameTimer.stop();
      setIsRunning(false);
    }
  };

  return { isRunning, startGameLoop, stopGameLoop };
};

export default useGameLoop;
