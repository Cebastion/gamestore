import { IGames } from './game.interface'

export interface IUser {
  Name: string
  Email: string
  Password: string
  games?: IGames
}