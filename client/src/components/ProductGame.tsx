import { Game } from '@/interface/Game.interface'
import { FC } from 'react'


const ProductGame: FC<Game> = ({ game }) => {
  return (
    <div className="product__block">
      <div className="block__image">
        <img src={game.Image} alt="" />
      </div>
      <div className="block__title">
        <span>{game.Name}</span>
      </div>
      <div className="block__price-button">
        <div className="block__price">
          <span>{game.Price}</span>
        </div>
        <button className="block__button">
          <span>Buy</span>
        </button>
      </div>
    </div>
  )
}

export default ProductGame