function ImagePopup({card, onClose}) {
    return(
        <div className={`popup ${card && "popup_open"} popup_type_image"`}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" onClick={onClose}></button>
                <img className="popup__image" alt={card.title} src={card.src}  />
                <h3 className="popup__subtitle">{card.title}</h3>
            </div>
        </div>
    );
}

export default ImagePopup;  