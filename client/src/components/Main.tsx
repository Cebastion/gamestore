import { FC, Suspense } from 'react'
import Filter from './Filter'
import ListGame from './ListGame'
import { Games } from '@/interface/Game.interface'
import React from 'react'

const Main: FC<Games> = ({games}) => {
  return (
    <div className="content">
      <div className="content__container">
        <Filter/>
        <ListGame games={games}/>
      </div>
    </div>
  )
}

export default Main