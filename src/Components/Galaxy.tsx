import { useState } from "react";
import { BUILDING_TYPE, ICity, IPlanet } from "../Game/Interfaces";
import { range } from "../Utils/util";
import { DIALOG_RESULT } from "./Dialog";
import PlanetDialog from "./Dialogs/PlanetDialog";
import Planet from "./Planet";

interface IGalaxyProps {
  planets: IPlanet[];
  size: number;
  onPlanetClicked: (planet: IPlanet) => void;
}

const Galaxy: React.FC<IGalaxyProps> = ({ planets, size, onPlanetClicked }) => {
  const grid = Array(size)
    .fill(1)
    .map((x, y) => x + y)
    .map((y) => (
      <tr key={`${y}`} style={{ height: `${100 / size}%` }}>
        {range(size).map((x) => {
          const planet = planets.filter(
            (n) => n.galaxyCoordinate.x === x && n.galaxyCoordinate.y === y
          )?.[0];
          return (
            <td key={`${y}_${x}`} style={{ border: "1px solid white" }}>
              {!!planet ? (
                <Planet
                  name={planet.name!}
                  onClick={() => onPlanetClicked(planet)}
                />
              ) : null}
            </td>
          );
        })}
      </tr>
    ));
  return (
    <div>
      <table style={{ width: "100vw", height: "100vh", tableLayout: "fixed" }}>
        <tbody>{grid}</tbody>
      </table>
    </div>
  );
};

export default Galaxy;
