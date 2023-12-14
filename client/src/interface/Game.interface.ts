export interface Game {
  game: {
    Image: string
    Name: string
    Tag: string[]
    Price: string
  }
}

export interface Games {
  games: Game[]
}