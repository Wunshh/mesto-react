import { useState, useContext, useEffect} from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, onCloseOverlayClick}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }, [currentUser]);


  function handleSubmit(evt) {
    evt.preventDefault();
    
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return(
    <PopupWithForm 
      name="edit" 
      title="Редактировать профиль" 
      buttonText="Сохранить" 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit} 
      onCloseOverlayClick={onCloseOverlayClick}
     >
      <input 
        className="form__user-info form__user-info_user_name form__input" 
        id="input-name" 
        name="name" 
        value={name || ""} 
        onChange={handleNameChange} 
        type="text" 
        required 
        placeholder="Имя" 
        minLength="2" 
        maxLength="40"
      />
      <span className="form__input-error input-name-error"></span>
      <input 
        className="form__user-info form__user-info_user_job form__input" 
        id="input-job" name="description" 
        value={description || ""} 
        onChange={handleDescriptionChange} 
        type="text" 
        required 
        placeholder="О себе" 
        minLength="2" 
        maxLength="200"
      />
      <span className="form__input-error input-job-error"></span> 
    </PopupWithForm>
  );
}