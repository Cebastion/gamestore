import express, { Request, Response } from 'express'
import ParserService from './service/parser.service'
import cors from "cors"

const app = express()
const port = 5500
app.use(cors())

app.get('/', async (req: Request, res: Response) => {
  const parserService = new ParserService()
  const page = parseInt(req.query.page as string) || 1
  const genres = (req.query.genres as string || '').toLowerCase().split(',').filter(Boolean)
  const priceRange = req.query.priceRange as string || '0,1000';

  const [minPrice, maxPrice] = priceRange.split(',').map(parseFloat);
  const DataJson = await parserService.GetGames(page, genres, minPrice, maxPrice)
  res.send(DataJson)
})

app.get('/login', (req: Request, res: Response) => {

})

app.get('/signin', (req: Request, res: Response) => {
  
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})