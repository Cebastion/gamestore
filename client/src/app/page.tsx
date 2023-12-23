'use client'
import Authentication from '@/components/Authentication/Authentication'
import RootLayout from './layout'
import Header from '@/components/Header'
import Main from '@/components/Main'
import { IGame, IGameOne } from '@/interface/Game.interface'
import { useState } from 'react'

export default function Home() {
  const [ListBuyGame, SetListBuyGame] = useState<IGameOne[]>([])
  const [User, SetUser] = useState<boolean>(false)
  return (
    <RootLayout>
      {User ?
        <>
          <Header ListBuyGame={ListBuyGame} setListBuyGame={SetListBuyGame} />
          <Main ListBuyGame={ListBuyGame} setListBuyGame={SetListBuyGame} />
        </>
        :
        <Authentication />
      }
    </RootLayout>
  )
}
