import express, { Request, Response } from 'express'
import ParserService from './service/parser.service'
import cors from "cors"
import dotenv from 'dotenv'
import { UserService } from './service/user.service'

const userService = new UserService()
const app = express()
const port = 5500
app.use(cors())
dotenv.config()

app.get('/', async (req: Request, res: Response) => {
  const parserService = new ParserService()
  const page = parseInt(req.query.page as string) || 1
  const genres = (req.query.genres as string || '').toLowerCase().split(',').filter(Boolean)
  const priceRange = req.query.priceRange as string || '0,1000';

  const [minPrice, maxPrice] = priceRange.split(',').map(parseFloat);
  const DataJson = await parserService.GetGames(page, genres, minPrice, maxPrice)
  res.send(DataJson)
})

app.post('/login', async (req: Request, res: Response) => {
  const email = req.body.email
  const password = req.body.password
  const user = await userService.LogIn(email, password)
  return user
})

app.post('/signin', async (req: Request, res: Response) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  const user = await userService.SignIn(name, email, password)
  return user
})

app.listen(port, async () => {
  console.log(`App listening at http://localhost:${port}`)
})