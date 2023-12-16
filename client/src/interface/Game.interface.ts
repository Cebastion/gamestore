export interface IGame {
  game: {
    Image: string
    Name: string
    Tag: string[]
    Price: string
  }
}

export interface IGames {
  games?: IGame[],
  pagination?: number
}