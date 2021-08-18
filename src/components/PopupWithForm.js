function PopupWithForm(props) { 

    return(
        <div className={`popup ${props.isOpen && "popup_open"} popup_type_${props.name}`}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" onClick={props.onClose}></button>
                <form className={`form form_${props.name}`} name="submitForm">
                    <h2 className="form__title">{props.title}</h2>
                    {props.children}
                    <button type="submit" className="form__save-button">{props.buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;