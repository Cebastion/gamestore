import { IGame, IGameOne, IGames } from '@/interface/Game.interface'
import { IListBuyGame } from '@/interface/ListBuyGame.interface'
import { FC } from 'react'


const ProductGame: FC<IGame & IListBuyGame> = ({ game, ListBuyGame = { games: [] }, setListBuyGame }) => {
  function AddBascket(SelectGame: IGameOne) {
    let newArray: IGames = { games: [...(ListBuyGame.games || []), SelectGame] }
    setListBuyGame(newArray)
  }
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
        <button className="block__button" onClick={() => AddBascket(game)}>
          <span>Buy</span>
        </button>
      </div>
    </div>
  )
}

export default ProductGame