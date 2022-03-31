import React from "react";
import { IGalaxy, IPlanet } from "../game/Interfaces";
import { range } from "../utils/util";

interface IPlanetProps {
  name: string;
}

interface IGalaxyProps {
  planets: IPlanet[];
  size: number;
}

const useRenderer = () => {
  const render = (galaxy: IGalaxy) => {
    return (
      <BackGround>
        <Galaxy planets={galaxy.planets} size={galaxy.size} />
      </BackGround>
    );
  };

  const Planet: React.FC<IPlanetProps> = ({ name }) => {
    return <>{name}</>;
  };

  const Galaxy: React.FC<IGalaxyProps> = ({ planets, size }) => {
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
                {!!planet ? <Planet name={planet.name} /> : null}
              </td>
            );
          })}
        </tr>
      ));
    return (
      <div>
        <table
          style={{ width: "100vw", height: "100vh", tableLayout: "fixed" }}
        >
          <tbody>{grid}</tbody>
        </table>
      </div>
    );
  };

  const BackGround: React.FC = ({ children }) => {
    return (
      <div
        style={{ width: "100vw", height: "100vh", backgroundColor: "black" }}
      >
        {children}
      </div>
    );
  };

  return { render };
};

export default useRenderer;
