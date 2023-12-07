import express, { Request, Response } from 'express';
import ParserService from './service/parser.service';

const app = express();
const port = 5500;

app.get('/', (req: Request, res: Response) => {
  const parserService = new ParserService();
  parserService.GetGames()
  res.send("Warhammer")
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})