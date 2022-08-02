import { IPlayer } from "../Game/Interfaces";

export const createPlayer = (
  name: string,
  race: string,
  credits: number
): IPlayer => {
  return { name, race, credits };
};

export const makePlayerPurchase = (
  player: IPlayer,
  credits: number,
  stateSet: (player: IPlayer) => void
): boolean => {
  if (player!.credits < credits) {
    return false;
  }
  stateSet({ ...player!, credits: player!.credits - credits });
  return true;
};
