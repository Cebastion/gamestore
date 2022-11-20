import React, {useState} from "react";
import gamelist from "./components/gameList";

import bascket from "../src/img/bascket.svg";
import favorite from "../src/img/favorite.svg";
import avatar from "./img/avatar.jpg";
import Product from "./components/Product";



function App() {
  const [filterData, setFilter] = useState(gamelist);
  const [value, setValue] = useState('');
  const [values, setValues] = useState('');
  const [active, Setactive] = useState(false);
  let newgame;

  const removeElement = () => {
    Setactive((prev) => !prev);
  };

  function GameTagFilter(tag){
        let newgame = [...gamelist].filter(game => game.tag.find(el => el.includes(tag)) === tag);
        setFilter(newgame)
  }
  function GamePlatformFilter(platform){
    let newgame = [...gamelist].filter(game => game.platform.find(el => el.includes(platform)) === platform);
    setFilter(newgame)
}

  function GamePriceFilter(value, values){
    if(value === '' || values === ''){
      newgame = [...gamelist];
      setFilter(newgame);
    }
    else{
      newgame = [...gamelist].filter(game => game.price >= value && game.price <= values);
      if(newgame.length === 0){
          newgame = [...gamelist];
          setFilter(newgame);
          Setactive(true);
          setValue('');
          setValues('');
      }else{
        setValue('');
        setValues('');
        setFilter(newgame);
      }
    }
  }

  return (
    <div className='walleper'>
      <header className='header'>
        <div className="header__container">
          <div className="header__title">
            <span>Game Store</span>
          </div>
          <div className="header__navigation">
            <div className="navigation__bascket">
              <img src={bascket} alt=""/>
            </div>
            <div class="navigation__favorite">
            <img src={favorite} alt=""/>
            </div>
            <div class="navigation__profile">
              <img src={avatar} alt=""/>
            </div>
          </div>
        </div>
      </header>
      <div className="content">
        <div className="content__container">
          <div className="content__filter">
              <div className="filter__categories">
                  <div className="categories__title">
                      <span>Categories</span>
                  </div>
                  <form action="" className="categories__tag">
                      <div className="label" onClick={() => GameTagFilter('All')}>
                          <label>All Game</label>
                      </div>
                      <div className="label" onClick={() => GameTagFilter('Action')}>
                          <label>Action</label>
                      </div>
                      <div className="label" onClick={() => GameTagFilter('Racing')}>
                          <label>Racing</label>
                      </div>
                      <div className="label" onClick={() => GameTagFilter('RPG')}>
                          <label>RPG</label>
                      </div>
                      <div className="label" onClick={() => GameTagFilter('Adventure')}>
                          <label>Adventure</label>
                      </div>
                      <div className="label" onClick={() => GameTagFilter('Arcade')}>
                          <label>Arcade</label>
                      </div>
                  </form>
              </div>
              <div className="filter__categories">
                  <div className="categories__title">
                      <span>Platforms</span>
                  </div>
                  <form action="" className="categories__platform">
                      <div className="label" onClick={() => GamePlatformFilter('PC')}>
                          <label>PC</label>
                      </div>
                      <div className="label" onClick={() => GamePlatformFilter('PS4')}>
                          <label>PS4</label>
                      </div>
                      <div className="label" onClick={() => GamePlatformFilter('PS5')}>
                          <label>PS5</label>
                      </div>
                  </form>
              </div>
              <div className="filter__categories">
                  <div className="categories__title">
                      <span>Price</span>
                  </div>
                  <form action="">
                    <div className="categories__inputs">
                      <div className="input">
                        <span>$</span>
                        <input type="text" name="" id="" value={value} onChange={(e) => setValue(e.target.value)}/>
                      </div>
                      <div className="line">-</div>
                      <div className="input">
                        <span>$</span>
                        <input type="text" name="" id="" value={values} onChange={(e) => setValues(e.target.value)}/>
                      </div>
                    </div>
                    <div className="categories__button" onClick={() => GamePriceFilter(value, values)}>
                      <span>Search Price</span>
                    </div>
                  </form>
              </div>
          </div>
          <Product filterData={filterData}/>
            {active && (
            <div className="error__block">
            <div className="error__title">
                <span>Not Found Game</span>
            </div>
            <div className="error__text">
                <span>We do not have such games with similar prices</span>
            </div>
            <button className="error__button" onClick={removeElement}>
                <span>OK</span>
            </button>
            </div>
            )}
        </div>
      </div>
    </div>
  );
}


export default App;
