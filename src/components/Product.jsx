import mainImg from "../img/WoW.jpg";
import Game from "../components/Game";

function Product({filterData}) {
    return ( 
    <div className="content__product">
        <div className="main__img">
            <img src={mainImg} alt=''/>
        </div>
        <div className="product__row">
            {filterData.map(el => (
                <Game key={el.name} game={el}/>
            ))}
        </div>
    </div>
);
}


export default Product;