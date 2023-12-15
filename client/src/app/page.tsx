'use client'
import RootLayout from './layout'
import Header from '@/components/Header'
import Main from '@/components/Main'
import { Games } from '@/interface/Game.interface'
import { GameService } from '@/service/Game.service'
import { useState, useEffect } from 'react'

export default function Home() {
  const [GameList, setGameList] = useState<Games>()
  const [Page, SetPage] = useState<number>(1)
  const [Genres, SetGenres] = useState<string[]>()
  const [RangePrice, SetRangePrice] = useState<number[]>()

  async function FetchGame() {
    const response = await GameService.GetGameList(Page, Genres, RangePrice)
    setGameList(response)
  }

  useEffect(() => {
    FetchGame()
  }, [])
  return (
    <RootLayout>
      <Header />
      <Main games={GameList?.games || []} />
    </RootLayout>
  )
}
