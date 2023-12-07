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
            if (link_page_product) {
              axios.get(link_page_product).then(product => {
                if (product.status === 200) {
                  const $ = cheerio.load(product.data)
                  for (let count_genre = 0; count_genre < this.max_count_genre; count_genre++) {
                    const genre_product = $(`body > div.layout.ng-scope > div:nth-child(9) > div.layout-side-col > div:nth-child(3) > div.details.table.table--without-border.ng-scope > div:nth-child(1) > div.details__content.table__row-content > a:nth-child(${count_genre})`).text()
                    this.list_genre.push(genre_product)
                  }
                  const directory = './dist/json'
                  if (!fs.existsSync(directory)) {
                    fs.mkdirSync(directory)
                  }
                }
              })
            }
            let game: Game = {
              Image: url_image_product || '',
              Name: name_product,
              Tag: this.list_genre,
              Price: parseInt(price_product),
            }
            const games: Games = {
              games: game_list
            }
          }
        } else {
          console.error("Error parser")
          return 0
        }
      })
    }
    const games_json = JSON.stringify(games)
    fs.writeFileSync(`./dist/json/games.json`, games_json)
    console.log(games)
    return games
  }
}