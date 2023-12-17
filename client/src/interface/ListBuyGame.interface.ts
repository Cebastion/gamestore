import { IGames } from './Game.interface'

export interface IListBuyGame {
  ListBuyGame?: IGames;
  setListBuyGame: React.Dispatch<React.SetStateAction<IGames | undefined>>;
}