interface Game {
    Image: string;
    Name: string;
    Tag: [string];
    Price: number;
}

interface Games {
    games: Game[];
}

export { Game, Games }