import Image from 'next/image'
import { FC } from 'react'

const Header: FC = () => {
  return (
    <header className='header'>
      <div className="header__container">
        <div className="header__title">
          <span>Game Store</span>
        </div>
        <div className="header__navigation">
          <div className='navigation__bascket' >
            <Image src='/bascket.svg' alt="" className='' width={35} height={35} />
          </div>
          <div className="navigation__favorite">
            <Image src='/favorite.svg' alt="" width={35} height={35}/>
          </div>
          <div className="navigation__profile">
            <Image src='/avatar.jpg' alt="" width={50} height={50}/>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header