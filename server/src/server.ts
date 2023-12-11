import express, { Request, Response } from 'express'
import ParserService from './service/parser.service'
import cors from "cors"
import path from 'path'
import fs from 'fs'

const app = express()
const port = 5500
app.use(cors())

app.get('/', async (req: Request, res: Response) => {
  const parserService = new ParserService()
  const jsonFilePath = path.join(__dirname, '/json/games.json')
  if (fs.existsSync(jsonFilePath)) {
    res.sendFile(jsonFilePath)
  } else {
    await parserService.GetGames(1)
    const jsonData: Record<string, any> = require(jsonFilePath)
    const selectedData = req.query.filter ? jsonData[req.query.filter as string] : jsonData
    res.json(selectedData)
  }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})