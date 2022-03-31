export interface INameable {
  name: string;
}

export interface IPlayer extends INameable {
  race: string;
}
export interface INpc extends IPlayer {}
export interface IHuman extends IPlayer {}

export interface IPlanet extends INameable {
  resourceQuantities?: IResourceQuantity[];
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
