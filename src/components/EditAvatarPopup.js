import { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const avatarRef = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
      
        onUpdateAvatar({
          link: avatarRef.current.value
        });
        
        avatarRef.current.value = "";
    }

    return(
        <PopupWithForm name="avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input className="form__user-info form__user-info_photo_src" id="input-avatar" name="link" type="url" ref={avatarRef} required placeholder="Ссылка на картинку" />
            <span className="form__input-error input-avatar-error"></span>
        </PopupWithForm>
    )
}