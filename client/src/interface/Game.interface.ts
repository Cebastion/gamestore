export default interface Game {
  Image: string;
  Name: string;
  Tag: string[];
  Price: string;
}

export default interface Games {
  games: {
      game: Game
  }[];
}