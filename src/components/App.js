import {useState} from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
    
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState("");

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
     
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard("");
    }

  return (
    <div className="App">
      <body className="page">
       <Header />
       <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}  onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
       <Footer />

       <PopupWithForm name="avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
            <input className="form__user-info form__user-info_photo_src" id="input-avatar" name="link" type="url" required placeholder="Ссылка на картинку" />
            <span className="form__input-error input-avatar-error"></span>
        </PopupWithForm>

        <PopupWithForm name="edit" title="Редактировать профиль" buttonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
            <input className="form__user-info form__user-info_user_name form__input" id="input-name" name="name" type="text" required placeholder="Имя" minlength="2" maxlength="40"/>
            <span className="form__input-error input-name-error"></span>
            <input className="form__user-info form__user-info_user_job form__input" id="input-job" name="about" type="text" required placeholder="О себе" minlength="2" maxlength="200"/>
            <span className="form__input-error input-job-error"></span> 
        </PopupWithForm>

        <PopupWithForm name="new-card" title="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
            <input className="form__user-info form__user-info_photo_name" id="input-title" name="name" type="text" required placeholder="Название" minlength="1" maxlength="30"/>
            <span className="form__input-error input-title-error"></span>
            <input className="form__user-info form__user-info_photo_src" id="input-src" name="link" type="url" required placeholder="Ссылка на картинку" />
            <span className="form__input-error input-src-error"></span>
        </PopupWithForm>

        <PopupWithForm name="delete-image" title="Вы уверены?" buttonText="Да" />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </body>
    </div>
  );
}

export default App;
