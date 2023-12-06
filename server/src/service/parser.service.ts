import * as cheerio from 'cheerio'
import axios from 'axios'
import fs from 'fs'

export default class ParserService {
  private URL = 'https://www.instant-gaming.com/ru/';

  PostGames() { }

  GetGames() {
    axios.get(this.URL).then(res => {
      if (res.status === 200) {
        const $ = cheerio.load(res.data)
        const getTitle = $('body > div.main-content > div > div.products-trending > div.listing-items.listing-slider > div:nth-child(1) > div > div.text > div > span').text()
        const directory = '../json'
        if (!fs.existsSync(directory)) {
          fs.mkdirSync(directory)
        }
        const games = JSON.stringify(getTitle)
        fs.writeFileSync(`../json/games.json`, games)
        console.log(getTitle)
        return getTitle
      }
    })
  }

  ConvertValue() { }
}