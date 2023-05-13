import './Card.css';

const Card = ({ src, style }) => {

    return (
        <img src={src} style={style}></img>
    )
}

export default Card;