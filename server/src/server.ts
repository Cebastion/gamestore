import express, { Request, Response } from 'express';
import ParserService from './service/parser.service';
import Game from './interface/game.interface';

const app = express();
const port = 5500;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})