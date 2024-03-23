'use client'
import RootLayout from './layout'
import Header from '@/components/Header'
import Main from '@/components/Main'
import { IGameOne } from '@/interface/Game.interface'
import { useState } from 'react'

export default function Home() {
  const [ListBuyGame, SetListBuyGame] = useState<IGameOne[]>([])

  return (
    <RootLayout>
        <>
          <Header ListBuyGame={ListBuyGame} setListBuyGame={SetListBuyGame} />
          <Main ListBuyGame={ListBuyGame} setListBuyGame={SetListBuyGame} />
        </>
    </RootLayout>
  )
}
