import * as cheerio from 'cheerio'
import axios from 'axios'
import fs from 'fs'
import { Game, Games } from "module";

export default class ParserService {
  private URL = 'https://www.gog.com/en/games/windows';

  PostGames() { }

  GetGames() {
    axios.get(this.URL).then(html => {
      if (html.status === 200) {
        const sourceElement = $('https://images.gog-statics.com/45a284386e693f1576b96d98a0023a7905d3956c6f9aa913d3fe5d09a5994bee_product_tile_extended_432x243.webp')
        const regex = /([^\s,]+)/;
        const $ = cheerio.load(html.data)
        const card_product = $('#Catalog > div > div.catalog__display-wrapper.catalog__grid-wrapper > paginated-products-grid > div > product-tile:nth-child(1)')
        const link_page_product = card_product.find('> a').attr('href')
        const name_product = card_product.find('> a > div.product-tile__info > div.product-tile__title.ng-star-inserted > product-title > span:nth-child(2)')
        const price_product = card_product.find('> a > div.product-tile__info > div.product-tile__footer > div > product-price > price-value > span.final-value.ng-star-inserted')
        const image_product = card_product.find('> a > div.product-tile__image-wrapper > store-picture > picture > source:nth-child(1)').attr('srcset')
        const url_image_product = image_product.match(regex)[1];
        axios.get(link_page_product).then(product => {
          if (product.status === 200) {
            const $ = cheerio.load(product.data)
            const genre_product = $('body > div.layout.ng-scope > div:nth-child(9) > div.layout-side-col > div:nth-child(3) > div.details.table.table--without-border.ng-scope > div:nth-child(1) > div.details__content.table__row-content > a:nth-child(1)').text()
            const directory = '/json'
            if (!fs.existsSync(directory)) {
              fs.mkdirSync(directory)
            }
            let game: Game = {
              Image: url_image_product;
              Name: name_product;
              Tag: [genre_product];
              Price: price_product;
            }
            const games: Games = {
              games: [game]
            }
            const games_json = JSON.stringify(games)
            fs.writeFileSync(`/json/games.json`, games_json)
            console.log(games)
            return games
          }
        })
      }
    })
  }

  ConvertValue() { }
}