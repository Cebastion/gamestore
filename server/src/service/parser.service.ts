import * as cheerio from 'cheerio'
import axios from 'axios'
import fs from 'fs'
import { Game, Games } from "../interface/game.interface"

export default class ParserService {
  private URL = 'https://www.gog.com/en/games'
  private max_count_page = 1
  private max_count_product = 3
  private max_count_genre = 3
  private regex = /([^\s,]+)/
  private list_genre: string[] = []
  private game_list: Games = {
    games: {
      game: []
    }
  }

  private GetGenreGame(url: string) {
    if (url) {
      axios.get(url).then(html => {
        if (html.status === 200) {
          const $ = cheerio.load(html.data)
          const genre_product = $(`div.details__content.table__row-content a`).map((index, element) => $(element).text())
          this.list_genre.push(...genre_product)
          console.log(this.list_genre)
          return this.list_genre
        }
      })
    } else {
      return 0
    }
  }

  GetGames() {
    for (let page = 0; page < this.max_count_page; page++) {
      axios.get(this.URL + `?page=${page}`).then(html => {
        if (html.status === 200) {
          const $ = cheerio.load(html.data)
          for (let count_product = 0; count_product < this.max_count_product; count_product++) {
            const link_page_product = $(`#Catalog > div > div.catalog__display-wrapper.catalog__grid-wrapper > paginated-products-grid > div > product-tile:nth-child(${count_product}) > a`).attr('href')
            const name_product = $(`#Catalog > div > div.catalog__display-wrapper.catalog__grid-wrapper > paginated-products-grid > div > product-tile:nth-child(${count_product}) > a > div.product-tile__info > div.product-tile__title.ng-star-inserted > product-title > span`).text()
            const price_product = $(`#Catalog > div > div.catalog__display-wrapper.catalog__grid-wrapper > paginated-products-grid > div > product-tile:nth-child(${count_product}) > a > div.product-tile__info > div.product-tile__footer > div > product-price > price-value > span.final-value.ng-star-inserted`).text()
            const image_product = $(`#Catalog > div > div.catalog__display-wrapper.catalog__grid-wrapper > paginated-products-grid > div > product-tile:nth-child(${count_product}) > a > div.product-tile__image-wrapper > store-picture > picture > source:nth-child(1)`).attr('srcset')
            const url_image_product = image_product?.match(this.regex)?.[1]
            console.log(link_page_product)
            console.log(name_product)
            console.log(price_product)
            console.log(url_image_product)
            this.GetGenreGame(link_page_product || '')
            let game: Game = {
              Image: url_image_product || '',
              Name: name_product,
              Tag: [...this.list_genre],
              Price: price_product,
            }
            this.game_list.games.game.push(game)
          }
          const games_json = JSON.stringify(this.game_list)
          const directory = './dist/json/'
          if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory)
          }
          fs.writeFileSync(`./dist/json/games.json`, games_json)
        } else {
          console.error("Error parser")
          return 0
        }
      })
    }
  }
}