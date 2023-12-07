interface Game {
    Image: string;
    Name: string;
    Tag: string[];
    Price: number;
}

interface Games {
    games: {
        game: Game
    };
}

export { Game, Games }