import { Genres } from '@/interface/Genre.list'
import { FC } from 'react'

const Filter: FC = () => {
  const list_genre: Genres = {
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
  return (
    <div className="content__filter">
      <div className="filter__categories">
        <div className="categories__title">
          <span>Categories</span>
        </div>
        <form action="" className="categories__tag">
          {list_genre.genres.map(genre => (
            <div className="label" key={genre.name}>
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
              <input type="text" name="" id="" />
            </div>
            <div className="line">-</div>
            <div className="input">
              <span>$</span>
              <input type="text" name="" id="" />
            </div>
          </div>
          <div className="categories__button">
            <span>Search Price</span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Filter