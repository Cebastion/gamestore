import { IGames } from './Game.interface'

export interface IUser {
  Name: string
  Email: string
  Password: string
  games?: IGames
}