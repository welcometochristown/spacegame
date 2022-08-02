export interface INameable {
  name: string;
}

export interface IPlayer extends INameable {
  race: string;
  credits: number;
}
export interface INpc extends IPlayer {}
export interface IHuman extends IPlayer {}

export enum BUILDING_TYPE {
  SHIPYARD,
}

export interface IBuilding {
  owner: IPlayer;
  type: BUILDING_TYPE;
}

export interface ICity extends INameable {
  id: number;
  building?: IBuilding;
}

export interface IPlanet extends INameable {
  id: number;
  cities: ICity[];
  resourceQuantities: IResourceQuantity[];
  galaxyCoordinate: ICoordinate;
}

export interface IResource extends INameable {}

export interface IResourceQuantity {
  resource: IResource;
  quantity: number;
}

export interface IGalaxy {
  planets: IPlanet[];
  size: number;
}

export interface IGameState {
  players: IPlayer[];
  galaxy: IGalaxy;
}

export interface ICoordinate {
  x: number;
  y: number;
}

export interface IOptions {
  option1: string;
}
