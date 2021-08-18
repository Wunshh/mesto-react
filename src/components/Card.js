function Card({card, onCardClick}) {

    function handleClick() {
        onCardClick(card);
    }  

    return (
        <div className="card">
            <img className="card__image" alt={card.alt} src={card.src} onClick={handleClick} />
            <button type="button" className="card__remove-button"></button>
            <div className="card__container">
                <h2 className="card__title">{card.title}</h2>
                <div className="card__like-container">
                    <button type="button" className="card__button"></button>
                    <p className="card__botton-counter">{card.like}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;