import * as cheerio from 'cheerio'
import axios from 'axios';
import fs from 'fs'; 

export default class ParserService {
  private URL = 'https://www.g2a.com/';

  PostGames() { }

  GetGames() { 
    axios.get(this.URL).then(res => {
      if(res.status === 200){
        const $ = cheerio.load(res.data)
        const getTitle = $('/html/body/div[3]/div[1]/main/div[14]/section/div[2]/div[1]/div/div/ul[1]/li[1]/div').text()
        console.log(getTitle)
        return getTitle
      }
    })
  }

  ConvertValue() { }
}