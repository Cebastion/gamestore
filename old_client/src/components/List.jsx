export default function List(props) {
    const {game} = props
    return ( 
        <div className="list__block">
            <div className="list__image">
                <img src={game.Image} alt="" />
            </div>
            <div className="list__title">
                <span>{game.Name}</span>
            </div>
            <div className="list__price">
                <span>${game.Price}</span>
            </div>
        </div>
    );
}