export default function Game(props) {
    const {game} = props;
    return ( 
        <div className="product__block">
            <div className="block__image">
                <img src={game.image} alt="" />
            </div>
            <div className="block__title">
                <span>{game.name}</span>
            </div>
            <div className="block__platform">
                <span>{game.platform}</span>
            </div>
            <div className="block__price-button">
                <div className="block__price">
                    <span>${game.price}</span>
                </div>
                <button className="block__button">
                    <span>Buy</span>
                </button>
            </div>
        </div>
    );
}