'use client'
import RootLayout from './layout'
import Header from '@/components/Header'
import Main from '@/components/Main'
import { Games } from '@/interface/Game.interface'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Home() {
  const [GameList, setGameList] = useState<Games>();

  useEffect(() => {
    axios.get(`http://localhost:5500/1`).then(res => {
      setGameList(res.data)
    })
  }, [])
  return (
    <RootLayout>
      <Header/>
      <Main games={GameList?.games || []}/>
    </RootLayout>
  )
}
