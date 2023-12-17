import { IGames, IGame } from '@/interface/Game.interface'
import axios from 'axios'

export const GameService = {
  async GetGameList(page?: number, genres: string[] | string = '', priceRange?: number[]){
    const {data} = await axios.get<IGames>(`http://localhost:5500/?page=${page}&genres=${genres}&priceRange=${priceRange}`)
    return data
  },
  AddGameBascket(SelectGame: IGame, array: IGames) {
    array.games = array.games || []
    return array.games.push(SelectGame)
  },
  DeleteGameBascket(SelectGame: IGame, array: IGames){
    const NewArray = array.games?.filter(game => game.game.Name !== SelectGame.game.Name)
    return NewArray
  }
}