interface Game {
    Image: string;
    Name: string;
    Tag: string[];
    Price: string;
}

interface Games {
    games: {
        game: Game
    }[],
    pagination: number
}

export { Game, Games }