"use strict";
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
const express_1 = __importDefault(require("express"));
const parser_service_1 = __importDefault(require("./service/parser.service"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = 5500;
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parserService = new parser_service_1.default();
    const result = yield parserService.GetGames(1);
    const jsonFilePath = __dirname + '/json/games.json';
    const jsonData = fs_1.default.readFileSync(jsonFilePath, 'utf-8');
    const combinedData = {
        result,
        json: JSON.parse(jsonData)
    };
    res.send(combinedData);
}));
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
