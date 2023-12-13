import express, { Request, Response } from 'express'
import ParserService from './service/parser.service'
import cors from "cors"


const app = express()
const port = 5500
app.use(cors())

app.get('/:page', async (req: Request, res: Response) => {
  const parserService = new ParserService()
  const page = parseInt(req.params.page)
  const DataJson = await parserService.GetGames(page)
  res.send(DataJson)
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})