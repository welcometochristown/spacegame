import React, { useState } from "react";
import { InputGroup, Label, Input, Button } from "reactstrap";

export interface IProps {
  onStart: (playerName: string, playerRace: string) => void;
}

const defaultStartupValues = {
  playerName: "Player 1",
  playerRace: "Human",
};

const Startup: React.FC<IProps> = ({ onStart }) => {
  const [playerName, setPlayerName] = useState<string | undefined>(
    defaultStartupValues.playerName
  );
  const [playerRace, setPlayerRace] = useState<string | undefined>(
    defaultStartupValues.playerRace
  );

  const handleStartButtonClicked = () => {
    if (playerName && playerRace) {
      onStart(playerName, playerRace);
    }
  };
  return (
    <>
      <InputGroup>
        <Label>Player Name</Label>
        <Input
          placeholder={defaultStartupValues.playerName}
          onChange={(event) => setPlayerName(event.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <Label>Player Race</Label>
        <Input
          placeholder={defaultStartupValues.playerRace}
          onChange={(event) => setPlayerRace(event.target.value)}
        />
      </InputGroup>

      <Button onClick={handleStartButtonClicked}>Start</Button>
    </>
  );
};

export default Startup;
