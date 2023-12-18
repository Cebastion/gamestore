import { IGame, IGameOne } from './Game.interface'

export interface IListBuyGame {
  ListBuyGame: IGameOne[];
  setListBuyGame: React.Dispatch<React.SetStateAction<IGameOne[]>>;
}