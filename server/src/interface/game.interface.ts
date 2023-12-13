interface Game {
    Image: string | Blob;
    Name: string;
    Tag: string[];
    Price: string;
}

interface Games {
    games: {
        game: Game[]
    };
}

export { Game, Games }