function PopupWithForm({isOpen, name, onClose, title, children, buttonText, onSubmit}) { 

    return(
        <div className={`popup ${isOpen && "popup_open"} popup_type_${name}`}>
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