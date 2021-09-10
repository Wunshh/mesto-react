import { useEffect, useRef } from 'react';

function ImagePopup({card, onClose, onCloseKeyDown, onCloseOverlayClick}) {
    const popupLinkRef = useRef();

    useEffect(() => {
        const currentPopup = popupLinkRef.current;

        currentPopup.addEventListener("click", onCloseOverlayClick);
        document.addEventListener("keydown", onCloseKeyDown);
        return() => {
            document.removeEventListener("keydown", onCloseKeyDown);
            currentPopup.removeEventListener("click", onCloseOverlayClick);
        }
    }, [card, onClose]);

    return(
        <div className={`popup ${card.link && "popup_open"} popup_type_image"`} ref={popupLinkRef}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" onClick={onClose}></button>
                <img className="popup__image" alt={card.name} src={card.link}  />
                <h3 className="popup__subtitle">{card.name}</h3>
            </div>
        </div>
    );
}

export default ImagePopup;  