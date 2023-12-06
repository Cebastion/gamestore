import * as cheerio from 'cheerio'
import axios from 'axios'
import fs from 'fs'

export default class ParserService {
  private URL = 'https://www.gog.com/en/games/windows';

  PostGames() { }

  GetGames() {
    axios.get(this.URL).then(res => {
      if (res.status === 200) {
        const $ = cheerio.load(res.data)
        const getTitle = $('Catalog > div > div.catalog__display-wrapper.catalog__grid-wrapper > paginated-products-grid > div > product-tile:nth-child(31) > a > div.product-tile__info > div.product-tile__footer > div > product-price > price-value > span.base-value.ng-star-inserted').text()
        const directory = '/json'
        if (!fs.existsSync(directory)) {
          fs.mkdirSync(directory)
        }
        const games = JSON.stringify(getTitle)
        fs.writeFileSync(`/json/games.json`, games)
        console.log(getTitle)
        return getTitle
      }
    })
  }

  ConvertValue() { }
}