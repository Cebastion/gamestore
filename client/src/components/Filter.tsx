'use client'
import { IGameList } from '@/interface/GameList.interface'
import { IGenres } from '@/interface/Genre.interface'
import { ILoader } from '@/interface/Loader.interface'
import { IPage } from '@/interface/Page.interface'
import { GameService } from '@/service/Game.service'
import { FC, useEffect, useState } from 'react'

const Filter: FC<IGameList & IPage & ILoader> = ({Page, setGameList, SetLoader}) => {
  const list_genre: IGenres = {
    genres: [
      { name: 'Action' },
      { name: 'Adventure' },
      { name: 'Racing' },
      { name: 'Role-playing' },
      { name: 'Shooter' },
      { name: 'Simulation' },
      { name: 'Sports' },
      { name: 'Strategy' },
    ]
  }

  const [Genres, SetGenres] = useState<string[] | string>()
  const [RangePrice, SetRangePrice] = useState<number[]>()
  const [maxPrice, SetmaxPrice] = useState<string>('')
  const [minPrice, SetminPrice] = useState<string>('')

  async function FetchGame() {
    try {
      SetLoader(true)
      SetRangePrice([parseInt(minPrice) ?? 0, parseInt(maxPrice) ?? Number.MAX_SAFE_INTEGER])
      const response = await GameService.GetGameList(Page, Genres, RangePrice)
      setGameList(response)
    } catch (error) {
      console.log("Error " + error)
    } finally {
      SetLoader(false)
    }
  }

  useEffect(() => {
    FetchGame()
  },[Page])

  return (
    <div className="content__filter">
      <div className="filter__categories">
        <div className="categories__title">
          <span>Categories</span>
        </div>
        <form action="" className="categories__tag">
          {list_genre.genres.map(genre => (
            <div className="label" key={genre.name} onClick={() => SetGenres(genre.name)}>
              <label>{genre.name}</label>
            </div>
          ))}
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
              <input type="text" name="" id="" value={minPrice} onChange={(e) => SetminPrice(e.target.value)}/>
            </div>
            <div className="line">-</div>
            <div className="input">
              <span>$</span>
              <input type="text" name="" id="" value={maxPrice}  onChange={(e) => SetmaxPrice(e.target.value)}/>
            </div>
          </div>
          <div className="categories__button" onClick={() => FetchGame()}>
            <span>Search Game</span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Filter