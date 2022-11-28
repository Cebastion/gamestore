export default function List(props) {
    const {game} = props
    return ( 
        <div className="list__block">
            <div className="list__image">
                <img src={game.image} alt="" />
            </div>
            <div className="list__title">
                <span>{game.name}</span>
            </div>
            <div className="list__price">
                <span>${game.price}</span>
            </div>
        </div>
    );
}