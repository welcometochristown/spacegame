import React, { useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import BackGround from "../Components/Background";
import { DIALOG_RESULT } from "../Components/Dialog";
import OptionsDialog from "../Components/Dialogs/OptionsDialog";
import PlanetDialog from "../Components/Dialogs/PlanetDialog";
import Galaxy from "../Components/Galaxy";
import Menu from "../Components/Menu";
import StatBar from "../Components/StatBar";
import useGameLoop from "../Hooks/useGameLoop";
import { generateGalaxy } from "../Utils/galaxyutil";
import { emptyOptions } from "../Utils/optionsutil";
import { createPlayer, makePlayerPurchase } from "../Utils/playerutil";
import {
  BUILDING_TYPE,
  ICity,
  IGalaxy,
  IOptions,
  IPlanet,
  IPlayer,
} from "./Interfaces";
import Startup from "./Startup";

const fps = 60;

const Game: React.FC = () => {
  ///globals
  const [options, setOptions] = useState<IOptions>(emptyOptions);
  const [galaxy, setGalaxy] = useState<IGalaxy>();
  const [player, setPlayer] = useState<IPlayer>();

  //temporaries
  const [selectedPlanet, setSelectedPlanet] = useState<IPlanet>();
  const [isOptionsDialogVisible, setIsOptionsDialogVisible] =
    useState<boolean>();

  const handleOptionsDialogClosed = (
    result: DIALOG_RESULT,
    newOptions: IOptions
  ) => {
    setIsOptionsDialogVisible(false);
    if (result === DIALOG_RESULT.Ok) setOptions(newOptions);
  };

  const handlePlanetDialogClosed = (
    result: DIALOG_RESULT,
    newPlanet: IPlanet
  ) => {
    setSelectedPlanet(undefined);
    if (result === DIALOG_RESULT.Ok) updatePlanet(newPlanet);
  };

  const updatePlanet = (planet: IPlanet) => {
    const index = galaxy!.planets.findIndex((n) => n.id === planet.id);
    const planets = [...galaxy!.planets];
    planets.splice(index, 1, planet);
    setGalaxy({
      ...galaxy!,
      planets,
    });
  };

  const handleBuild = (type: BUILDING_TYPE, planet: IPlanet, city: ICity) => {
    if (!makePlayerPurchase(player!, 10, setPlayer)) return;

    const pIndex = galaxy!.planets.findIndex((n) => n.id === planet.id);
    const cIndex = galaxy!.planets[pIndex].cities.findIndex(
      (n) => n.id === city.id
    );

    const newCity: ICity = {
      ...galaxy!.planets[pIndex].cities[cIndex],
      building: {
        owner: player!,
        type: type,
      },
    };

    const cities = [...galaxy!.planets[pIndex].cities];
    cities.splice(cIndex, 1, newCity);

    const newPlanet: IPlanet = {
      ...galaxy!.planets[pIndex],
      cities,
    };

    const planets = [...galaxy!.planets];
    planets.splice(pIndex, 1, newPlanet);

    setSelectedPlanet(newPlanet);
    setGalaxy({
      ...galaxy!,
      planets,
    });
  };

  const { isRunning, startGameLoop, stopGameLoop } = useGameLoop(() => {
    //console.log("game loop");
  }, 1000 / fps);

  const handleStartGame = (playerName: string, playerRace: string) => {
    setPlayer(createPlayer(playerName, playerRace, 100_000));
    startGameLoop();
  };

  if (!isRunning) {
    return <Startup onStart={handleStartGame} />;
  }

  //if game is running, make sure we generate a galaxy
  if (!galaxy) {
    setGalaxy(generateGalaxy());
  }

  //once galaxy is ready and player is ready, display the game
  if (galaxy && player) {
    return (
      <>
        {player.name} ({player.race})
        <StatBar stats={{ credits: player.credits, ships: 0 }} />
        <Menu onOptionsClicked={() => setIsOptionsDialogVisible(true)} />
        <BackGround>
          <Galaxy
            planets={galaxy.planets}
            size={galaxy.size}
            onPlanetClicked={setSelectedPlanet}
          />
        </BackGround>
        <PlanetDialog
          item={selectedPlanet}
          isOpen={!!selectedPlanet}
          onClose={handlePlanetDialogClosed}
          onBuild={handleBuild}
        />
        <OptionsDialog
          item={options}
          isOpen={isOptionsDialogVisible}
          onClose={handleOptionsDialogClosed}
        />
      </>
    );
  }

  return <Spinner title="Loading" />; // show loading screen
};

export default Game;
