import { useEffect, useRef } from 'react';

function PopupWithForm({isOpen, name, onClose, title, children, buttonText, onSubmit, onCloseOverlayClick, onCloseKeyDown}) { 

    const popupLinkRef = useRef();

    useEffect(() => {
        const currentPopup = popupLinkRef.current;
        currentPopup.addEventListener("mousedown", onCloseOverlayClick);
        document.addEventListener("keydown", onCloseKeyDown);
        return() => {
            document.removeEventListener("keydown", onCloseKeyDown);
            currentPopup.removeEventListener("mousedown", onCloseOverlayClick);
        }
    }, [isOpen, onClose]);

    return(
        <div className={`popup popup_type_${name} ${isOpen ? "popup_open" : ""}`} ref={popupLinkRef}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" onClick={onClose}></button>
                <form className={`form form_${name}`} name={name} onSubmit={onSubmit}>
                    <h2 className="form__title">{title}</h2>
                    {children}
                    <button type="submit" className="form__save-button">{buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;