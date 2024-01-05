import { IGames } from '@/interface/Game.interface'
import { IUser } from '@/interface/User.interface'
import axios from 'axios'

export const GameService = {
  async GetGameList(page?: number, genres: string[] | string = '', priceRange?: number[]) {
    const { data } = await axios.get<IGames>(`https://gamestore-azure.vercel.app/?page=${page}&genres=${genres}&priceRange=${priceRange}`)
    return data
  },

  async LogIn(email: string, password: string) {
    const { data } = await axios.post<IUser>('https://gamestore-azure.vercel.app/login', { email, password })
    return { data }
  },

  async SignIn(name: string, email: string, password: string) {
    const { data } = await axios.post<IUser>('https://gamestore-azure.vercel.app/signin', { name, email, password })
    return { data }
  }
}