'use client'
import RootLayout from './layout'
import Header from '@/components/Header'
import Main from '@/components/Main'
import { IGames } from '@/interface/Game.interface'
import { useState } from 'react'

export default function Home() {
  const [ListBuyGame, SetListBuyGame] = useState<IGames>()
  return (
    <RootLayout>
      <Header ListBuyGame={ListBuyGame} setListBuyGame={SetListBuyGame}/>
      <Main ListBuyGame={ListBuyGame} setListBuyGame={SetListBuyGame}/>
    </RootLayout>
  )
}
