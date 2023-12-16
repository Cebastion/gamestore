import { IGames } from './Game.interface'

export interface IGameList {
  GameList?: IGames;
  setGameList: React.Dispatch<React.SetStateAction<IGames | undefined>>;
}