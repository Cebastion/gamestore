

export default function Game(props) {
    const {game} = props
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
            </div>
        </div>
    );
}