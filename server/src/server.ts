import express, { Request, Response } from 'express'
import ParserService from './service/parser.service'
import fs from 'fs'

const app = express()
const port = 5500

app.get('/', async (req: Request, res: Response) => {
  const parserService = new ParserService()
  const result = await parserService.GetGames(1)
  const jsonFilePath = __dirname + '/json/games.json';
  const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
  const combinedData = {
    result,
    json: JSON.parse(jsonData)
  };
  res.send(combinedData);
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})