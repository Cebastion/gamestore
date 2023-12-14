import { Games } from '@/interface/Game.interface'
import { FC, Suspense } from 'react'
import Image from 'next/image'
import React from 'react'

const ListGame: FC<Games> = ({ games }) => {
  const ProductGame = React.lazy(() => import('./ProductGame'))
  return (
    <div className="content__product">
      <div className="main__img">
        <Image src='/WoW.jpg' alt='' width={1180} height={259} />
      </div>
      <Suspense fallback={<div style={{ color: 'white', fontSize: '24px' }}>Loading...</div>}>
        <div className="product__row">
          {games.map(game => (
            <ProductGame key={game.game.Name} game={game.game} />
          ))}
        </div>
      </Suspense>
    </div>
  )
}

export default ListGame