import React, { useState } from "react";
import { InputGroup, Label, Input, Button } from "reactstrap";

export interface IProps {
  onStart: (playerName: string) => void;
}

const Startup: React.FC<IProps> = ({ onStart }) => {
  const [playerName, setPlayerName] = useState<string | undefined>();
  const handleStartButtonClicked = () => {
    if (playerName) {
      onStart(playerName);
    }
  };
  return (
    <>
      <InputGroup>
        <Label>Player Name</Label>
      </InputGroup>
      <Input onChange={(event) => setPlayerName(event.target.value)} />
      <Button onClick={handleStartButtonClicked}>Start</Button>
    </>
  );
};

export default Startup;
