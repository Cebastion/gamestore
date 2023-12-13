import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import { Game, Games } from "../interface/game.interface";
import path from 'path';

export default class ParserService {
  private URL = 'https://www.gog.com/en/games';
  private max_count_page = 186;
  private max_count_product = 12;
  private regex = /([^\s,]+)/;
  private game_list: Games = {
    games: []
  };

  private async GetGenreGame(url: string): Promise<string[]> {
    if (url) {
      const response = await axios.get(url);
      if (response.status === 200) {
        const $ = cheerio.load(response.data);
        const genres = $(`div.details__content.table__row-content a`).map((index, element) => $(element).text().trim()).get();
        const filteredGenres = genres.filter(genre => ['Action', 'Adventure', 'Racing', 'Role-playing', 'Shooter', 'Simulation', 'Sports', 'Strategy'].includes(genre));
        return filteredGenres;
      }
    }
    return [];
  }

  private async WriteFileJson(game_list: Games) {
    const games_json = JSON.stringify(game_list);
    const directory = path.resolve(__dirname, '../json');
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    fs.writeFileSync(path.join(directory, 'games.json'), games_json);
    return games_json;
  }

  async GetGames(page: number) {

    if (page > this.max_count_page) {
      return "Error page";
    }

    const html = await axios.get(this.URL + `?page=${page}`);

    if (html.status !== 200) {
      console.error("Error parser");
      return 0;
    }

    const $ = cheerio.load(html.data);
    const promises: Promise<void>[] = [];

    for (let count_product = 1; count_product <= this.max_count_product; count_product++) {
      const card_product = `#Catalog > div > div.catalog__display-wrapper.catalog__grid-wrapper > paginated-products-grid > div > product-tile:nth-child(${count_product}) > a`;
      const link_page_product = $(`${card_product}`).attr('href');

      if (!link_page_product) {
        continue;
      }

      const promise = (async () => {
        const name_product = $(`${card_product} > div.product-tile__info > div.product-tile__title.ng-star-inserted > product-title > span`).text();
        const price_product = $(`${card_product} > div.product-tile__info > div.product-tile__footer > div > product-price > price-value > span.final-value.ng-star-inserted`).text();
        const image_product = $(`${card_product} > div.product-tile__image-wrapper > store-picture > picture > source:nth-child(1)`).attr('srcset');
        const url_image_product = image_product?.match(this.regex)?.[1];
        const tags = await this.GetGenreGame(link_page_product);
        const game: Game = {
          Image: url_image_product || '',
          Name: name_product,
          Tag: tags,
          Price: price_product,
        };
        this.game_list.games.push({ game });
      })();

      promises.push(promise);
    }

    await Promise.all(promises);

    const game_json = await this.WriteFileJson(this.game_list);
    return game_json;
  }
}
