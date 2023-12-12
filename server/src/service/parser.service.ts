import axios from 'axios'
import * as cheerio from 'cheerio'
import fs from 'fs'
import { Game, Games } from "../interface/game.interface"
import path from 'path'

export default class ParserService {
  private URL = 'https://www.gog.com/en/games'
  private max_count_page = 186
  private max_count_product = 48
  private regex = /([^\s,]+)/
  private game_list: Games = {
    games: {
      game: []
    }
  }

  private async GetGenreGame(url: string): Promise<string[]> {
    if (url) {
      const response = await axios.get(url)
      if (response.status === 200) {
        const $ = cheerio.load(response.data)
        const genres = $(`div.details__content.table__row-content a`).map((index, element) => $(element).text().trim()).get()
        const filteredGenres = genres.filter(genre => genre == 'Action' || genre == 'Adventure' || genre == 'Racing' || genre == 'Role-playing' || genre == 'Shooter' || genre == 'Simulation' || genre == 'Sports' || genre == 'Strategy')
        return filteredGenres
      }
    }
    return []
  }

  private async WriteFileJson(game_list: Games) {
    const games_json = JSON.stringify(game_list)
    const directory = path.resolve(__dirname, '../json')
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true })
    }
    fs.writeFileSync(path.join(directory, 'games.json'), games_json)
    return games_json
  }

  private async GetPhotoBuffer(url_img: string): Promise<{ buffer: Buffer | null, url_image_buffer_product: string }> {
    if (url_img !== undefined && url_img !== '') {
      const res = await axios.get(url_img, { responseType: 'arraybuffer' })
      const buffer = Buffer.from(res.data)
      console.log(buffer)

      return { buffer, url_image_buffer_product: url_img }
    } else {
      return { buffer: null, url_image_buffer_product: '' }
    }
  }

  async GetGames(page: number) {
    if (page <= this.max_count_page) {
      await axios.get(this.URL + `?page=${page}`).then(async html => {
        if (html.status === 200) {
          const $ = cheerio.load(html.data)
          for (let count_product = 1; count_product <= this.max_count_product; count_product++) {
            const link_page_product = $(`#Catalog > div > div.catalog__display-wrapper.catalog__grid-wrapper > paginated-products-grid > div > product-tile:nth-child(${count_product}) > a`).attr('href')
            const name_product = $(`#Catalog > div > div.catalog__display-wrapper.catalog__grid-wrapper > paginated-products-grid > div > product-tile:nth-child(${count_product}) > a > div.product-tile__info > div.product-tile__title.ng-star-inserted > product-title > span`).text()
            const price_product = $(`#Catalog > div > div.catalog__display-wrapper.catalog__grid-wrapper > paginated-products-grid > div > product-tile:nth-child(${count_product}) > a > div.product-tile__info > div.product-tile__footer > div > product-price > price-value > span.final-value.ng-star-inserted`).text()
            const image_product = $(`#Catalog > div > div.catalog__display-wrapper.catalog__grid-wrapper > paginated-products-grid > div > product-tile:nth-child(${count_product}) > a > div.product-tile__image-wrapper > store-picture > picture > source:nth-child(1)`).attr('srcset')
            const image_buffer_product = $(`#Catalog > div > div.catalog__display-wrapper.catalog__grid-wrapper > paginated-products-grid > div > product-tile:nth-child(${count_product}) > a > div.product-tile__image-wrapper > store-picture > picture > img`).attr('src')
            const url_image_product = image_product?.match(this.regex)?.[1]
            const { buffer, url_image_buffer_product } = await this.GetPhotoBuffer(image_buffer_product || '')
            const tags = await this.GetGenreGame(link_page_product || '')
            let game: Game = {
              Image: url_image_product || url_image_buffer_product || '',
              Name: name_product,
              Tag: tags,
              Price: price_product,
            }
            this.game_list.games.game.push(game)
          }
          const game_json = await this.WriteFileJson(this.game_list)
          return game_json
        } else {
          console.error("Error parser")
          return 0
        }
      })
    } else {
      return "Error page"
    }
  }
}