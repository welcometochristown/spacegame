import React from "react";
import { Button } from "reactstrap";
import { BUILDING_TYPE, IBuilding } from "../Game/Interfaces";

interface IBuildingProps {
  building?: IBuilding;
  onBuild?: (type: BUILDING_TYPE) => void;
}

const Building: React.FC<IBuildingProps> = ({ building, onBuild }) => {
  if (!building) {
    if (!onBuild) return <></>;
    return (
      <>
        <Button onClick={() => onBuild(BUILDING_TYPE.SHIPYARD)}>
          Build Shipyard
        </Button>
      </>
    );
  }
  return <>Building goes here</>;
};

export default Building;
