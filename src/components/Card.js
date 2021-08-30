import {useContext} from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({card, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
    `${isOwn ? 'card__remove-button card__remove-button_visible' : 'card__remove-button'}`
    );

    const isLiked = card.likes.some((item) => {
        return item._id === currentUser._id
    });

    const cardLikeButtonClassName = (
        `${isLiked ? 'card__button card__button_active' : 'card__button'}`
    );

    function handleClick() {
        onCardClick(card);
    }  

    function handleLike() {
        onCardLike(card);
    }

    function handleDelete() {
        onCardDelete(card)
    }

    return (
        <div className="card">
            <img className="card__image" alt={card.name} src={card.link} onClick={handleClick} />
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDelete}></button>
            <div className="card__container">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLike}></button>
                    <p className="card__botton-counter">{card.likes.length}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;