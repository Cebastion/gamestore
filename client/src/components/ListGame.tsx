import { IGames } from '@/interface/Game.interface'
import { FC, Suspense } from 'react'
import Image from 'next/image'
import React from 'react'
import { IPage } from '@/interface/Page.interface'
import ProductGame from './ProductGame'
import { ILoader } from '@/interface/Loader.interface'
import { IError } from '@/interface/Error.interface'
import { IListBuyGame } from '@/interface/ListBuyGame.interface'

const ListGame: FC<IGames & IPage & ILoader & IError & IListBuyGame> = ({ games, pagination, Page, SetPage, Loader, SetLoader, Error, SetError, ListBuyGame, setListBuyGame }) => {

  function NextPage(Page: number) {
    if(pagination !== undefined && Page <= pagination){
      SetPage(Page+1)
    }
  }
  function PrevPage(Page: number) {
    if(Page > 1){
      SetPage(Page-1)
    }
  }

  return (
    <div className="content__product">
      <div className="main__img">
        <Image src='/WoW.jpg' alt='' width={1180} height={259} />
      </div>
      {!Loader ?
        <>
          <div className="pagination">
            <span className='pagination__page'>{Page} / {pagination}</span>
            <span className='pagination__prev' onClick={() => PrevPage(Page)}>Prev</span>
            <span className='pagination__next' onClick={() => NextPage(Page)}>Next</span>
          </div>
          <div className="product__row">
            {games?.map(game => (
              <ProductGame key={game.game.Name} game={game.game} ListBuyGame={ListBuyGame} setListBuyGame={setListBuyGame}/>
            ))}
          </div>
        </>
        : Error ? <div>Error page</div>  : <div>Loading...</div>}
    </div>
  )
}

export default ListGame