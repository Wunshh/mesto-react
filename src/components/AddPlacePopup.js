import { useState, useEffect} from 'react';
import PopupWithForm from "./PopupWithForm.js";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, onCloseOverlayClick }) {

    const [cardName, setCardName] = useState("");
    const [cardLink, setCardLink] = useState("");

    function handleCardNameAdd(evt) {
        setCardName(evt.target.value);
    }

    function handleCardLinkAdd(evt) {
        setCardLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onAddPlace({
            name: cardName,
            link: cardLink,
        });
    }

    useEffect(() => {
        setCardName("");
        setCardLink("");
    }, [isOpen]);

    return(
        <PopupWithForm 
            name="new-card" 
            title="Новое место" 
            buttonText="Создать" 
            isOpen={isOpen} 
            onClose={onClose} 
            onSubmit={handleSubmit}
            onCloseOverlayClick={onCloseOverlayClick}
         >
            <input 
                className="form__user-info form__user-info_photo_name" 
                id="input-title" 
                name="cardName" 
                value={cardName} 
                onChange={handleCardNameAdd} 
                type="text" 
                required 
                placeholder="Название" 
                minLength="1" 
                maxLength="30"
            />
            <span className="form__input-error input-title-error"></span>
            <input 
                className="form__user-info form__user-info_photo_src" 
                id="input-src" 
                name="cardLink" 
                value={cardLink} 
                onChange={handleCardLinkAdd} 
                type="url" 
                required 
                placeholder="Ссылка на картинку" 
            />
            <span className="form__input-error input-src-error"></span>
        </PopupWithForm>
    );
}  