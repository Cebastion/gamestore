import { IGames } from '@/interface/Game.interface'
import { FC, Suspense } from 'react'
import Image from 'next/image'
import React from 'react'
import { IPage } from '@/interface/Page.interface'
import ProductGame from './ProductGame'
import { ILoader } from '@/interface/Loader.interface'

const ListGame: FC<IGames & IPage & ILoader> = ({ games, pagination, Page, SetPage, Loader, SetLoader }) => {
  return (
    <div className="content__product">
      <div className="main__img">
        <Image src='/WoW.jpg' alt='' width={1180} height={259} />
      </div>
      {!Loader ?
        <>
          <div className="pagination">
            <span>{Page} / {pagination}</span>
            <span onClick={() => SetPage(Page - 1)}>Prev</span>
            <span onClick={() => SetPage(Page + 1)}>Next</span>
          </div>
          <div className="product__row">
            {games?.map(game => (
              <ProductGame key={game.game.Name} game={game.game} />
            ))}
          </div>
        </>
        : <div>Loading...</div>}
    </div>
  )
}

export default ListGame