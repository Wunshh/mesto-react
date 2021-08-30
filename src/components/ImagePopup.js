function ImagePopup({card, onClose}) {
    return(
        <div className={`popup ${card.link && "popup_open"} popup_type_image"`}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" onClick={onClose}></button>
                <img className="popup__image" alt={card.name} src={card.link}  />
                <h3 className="popup__subtitle">{card.name}</h3>
            </div>
        </div>
    );
}

export default ImagePopup;  