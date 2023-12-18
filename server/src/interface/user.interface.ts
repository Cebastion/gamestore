import { IGames } from './game.interface'

export interface IUser {
  user: {
    Name: string;
    Email: string;
    Password: string;
    games: IGames
  }
}