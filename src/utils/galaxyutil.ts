import { range } from "d3";
import { ICoordinate, IGalaxy } from "../Game/Interfaces";
import { random } from "./util";

export const getRandomCoordinates = (
  count: number,
  size: number
): ICoordinate[] => {
  const coords: ICoordinate[] = [];

  for (var i = 0; i < count; i++) {
    let x = 0;
    let y = 0;

    while (true) {
      x = random(size);
      y = random(size);

      if (!coords.some((n) => n.x === x && n.y === y)) break;
    }
    coords.push({ x, y });
  }

  return coords;
};

export const generateGalaxy = (
  planets: number = 10,
  galaxySize: number = 10
): IGalaxy => {
  const cords = getRandomCoordinates(planets, galaxySize);
  return {
    size: galaxySize,
    planets: range(planets).map((index) => ({
      id: index,
      resourceQuantities: [],
      name: `Planet${index}`,
      galaxyCoordinate: cords[index],
      cities: [
        {
          id: 0,
          name: "City 1",
        },
      ],
    })),
  };
};
