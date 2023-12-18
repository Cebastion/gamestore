'use client'
import { IListBuyGame } from '@/interface/ListBuyGame.interface'
import Image from 'next/image'
import { FC } from 'react'
import ListBasket from './ListBacket'

const Header: FC<IListBuyGame> = ({ListBuyGame, setListBuyGame}) => {
  return (
    <header className='header'>
      <div className="header__container">
        <div className="header__title">
          <span>Game Store</span>
        </div>
        <div className="header__navigation">
          <div className='navigation__favorite' >
            <Image src='/bascket.svg' alt="" className='' width={35} height={35} />
            <ListBasket ListBuyGame={ListBuyGame} setListBuyGame={setListBuyGame}/>
          </div>
          <div className="navigation__profile">
            <Image src='/avatar.jpg' alt="" width={50} height={50}/>
          </div>
        </div>
      </div>
    </header>
  )
}
//<ListBasket ListBuyGame={ListBuyGame} setListBuyGame={setListBuyGame}/>
export default Header