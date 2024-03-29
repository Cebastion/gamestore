import { IGames } from '@/interface/Game.interface'
import axios from 'axios'

export const GameService = {
  async GetGameList(page?: number, genres: string[] | string = '', priceRange?: number[]) {
    const { data } = await axios.get<IGames>(`https://gamestore-server-two.vercel.app/?page=${page}&genres=${genres}&priceRange=${priceRange}`)
    return data
  },
}