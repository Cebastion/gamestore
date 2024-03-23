import { IBascketState } from '@/interface/Bascket.interface';
import { IListBuyGame } from '@/interface/ListBuyGame.interface'
import Image from 'next/image'
import { FC } from 'react'

const ListBasket: FC<IListBuyGame & IBascketState> = ({ ListBuyGame, setListBuyGame, BascketState, SetBascketState }) => {
  const DeleteGameBasket = (index: number) => {
    setListBuyGame(prevList => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });
  };
  return (
    <>
      {BascketState && (
        <div className="bascket__list">
          {ListBuyGame.length == 0 ? (
            <div className="list__title">
              <span>Empty</span>
            </div>
          ) :
            <>
              {ListBuyGame.map((game, index) => (
                <div className="flex" key={index}>
                  <div className="list__block">
                    <div className="list__image">
                      <Image src={game.Image} alt="" width={50} height={50} />
                    </div>
                    <div className="list__title">
                      <span>{game.Name}</span>
                    </div>
                    <div className="list__price">
                      <span>{game.Price}</span>
                    </div>
                  </div>
                  <button className="list__delete" onClick={() => DeleteGameBasket(index)}>
                    <span>X</span>
                  </button>
                </div>
              ))}
            </>}
        </div>
      )}
    </>
  )
}

export default ListBasket