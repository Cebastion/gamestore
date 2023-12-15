import { Games } from '@/interface/Game.interface'
import axios from 'axios'

export const GameService = {
  async GetGameList(page: number, genres?: string[], priceRange?: number[]){
    const {data} = await axios.get<Games>(`http://localhost:5500/?page=${page}&genres=${genres}&priceRange=${priceRange}`)
    return data
  }
}