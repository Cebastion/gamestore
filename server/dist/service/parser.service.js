"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __importStar(require("cheerio"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
class ParserService {
    constructor() {
        this.URL = 'https://www.gog.com/en/games';
        this.max_count_page = 186;
        this.max_count_product = 48;
        this.regex = /([^\s,]+)/;
        this.game_list = {
            games: {
                game: []
            }
        };
    }
    GetGenreGame(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (url) {
                    const response = yield axios_1.default.get(url);
                    if (response.status === 200) {
                        const $ = cheerio.load(response.data);
                        const genres = $(`div.details__content.table__row-content a`).map((index, element) => $(element).text().trim()).get();
                        const filteredGenres = genres.filter(genre => genre == 'Action' || genre == 'Adventure' || genre == 'Racing' || genre == 'Role-playing' || genre == 'Shooter' || genre == 'Simulation' || genre == 'Sports' || genre == 'Strategy');
                        return filteredGenres;
                    }
                }
            }
            catch (error) {
                console.error("Error fetching genre:", error);
            }
            return [];
        });
    }
    WriteFileJson(game_list) {
        const games_json = JSON.stringify(game_list);
        const directory = './dist/json/';
        if (!fs_1.default.existsSync(directory)) {
            fs_1.default.mkdirSync(directory);
        }
        fs_1.default.writeFileSync(`./dist/json/games.json`, games_json);
        console.log("Send JSON file");
        return games_json;
    }
    GetGames(page) {
        return __awaiter(this, void 0, void 0, function* () {
            if (page <= this.max_count_page) {
                yield axios_1.default.get(this.URL + `?page=${page}`).then((html) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    if (html.status === 200) {
                        const $ = cheerio.load(html.data);
                        for (let count_product = 1; count_product <= this.max_count_product; count_product++) {
                            const link_page_product = $(`#Catalog > div > div.catalog__display-wrapper.catalog__grid-wrapper > paginated-products-grid > div > product-tile:nth-child(${count_product}) > a`).attr('href');
                            const name_product = $(`#Catalog > div > div.catalog__display-wrapper.catalog__grid-wrapper > paginated-products-grid > div > product-tile:nth-child(${count_product}) > a > div.product-tile__info > div.product-tile__title.ng-star-inserted > product-title > span`).text();
                            const price_product = $(`#Catalog > div > div.catalog__display-wrapper.catalog__grid-wrapper > paginated-products-grid > div > product-tile:nth-child(${count_product}) > a > div.product-tile__info > div.product-tile__footer > div > product-price > price-value > span.final-value.ng-star-inserted`).text();
                            const image_product = $(`#Catalog > div > div.catalog__display-wrapper.catalog__grid-wrapper > paginated-products-grid > div > product-tile:nth-child(${count_product}) > a > div.product-tile__image-wrapper > store-picture > picture > source:nth-child(1)`).attr('srcset');
                            const url_image_product = (_a = image_product === null || image_product === void 0 ? void 0 : image_product.match(this.regex)) === null || _a === void 0 ? void 0 : _a[1];
                            const tags = yield this.GetGenreGame(link_page_product || '');
                            let game = {
                                Image: url_image_product || '',
                                Name: name_product,
                                Tag: tags,
                                Price: price_product,
                            };
                            this.game_list.games.game.push(game);
                        }
                        const game_json = this.WriteFileJson(this.game_list);
                        return game_json;
                    }
                    else {
                        console.error("Error parser");
                        return 0;
                    }
                }));
            }
            else {
                return "Error page";
            }
        });
    }
}
exports.default = ParserService;
