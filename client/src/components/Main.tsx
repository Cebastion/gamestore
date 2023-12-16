'use client'
import { FC, useEffect, useState } from 'react'
import Filter from './Filter'
import ListGame from './ListGame'
import { IGames } from '@/interface/Game.interface'
import { GameService } from '@/service/Game.service'

const Main: FC = () => {
  const [GameList, setGameList] = useState<IGames>()
  const [Page, SetPage] = useState<number>(1)
  const [Loader, SetLoader] = useState<boolean>(false)

  async function FetchGame() {
    try {
      SetLoader(true)
      const response = await GameService.GetGameList(Page)
      setGameList(response)
    } catch (error) {
      console.log("Error: " + error)
    } finally {
      SetLoader(false)
    }
  }

  useEffect(() => {
    FetchGame()
  }, [])
  return (
    <div className="content">
      <div className="content__container">
        <Filter setGameList={setGameList} Page={Page} SetPage={SetPage} SetLoader={SetLoader}/>
        <ListGame games={GameList?.games} Loader={Loader} SetLoader={SetLoader} pagination={GameList?.pagination} Page={Page} SetPage={SetPage}/>
      </div>
    </div>
  )
}

export default Main