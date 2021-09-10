import {useState, useEffect} from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"; 
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

function App() {
    
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({name: "", link: ""});
    const [selectedCardDelet, setSelectedCardDelete] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getInitialCards(), api.getUserInfoFromServer()])
        .then(([dataCards, dataUser]) => {
            setCards(dataCards);
            setCurrentUser(dataUser);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    function handleCardLike(card) {
        const isLiked = card.likes.some((item) => {
            return item._id === currentUser._id
        });
      
        api.changeLikeCardStatus(card._id, isLiked)
        .then((newCard) => {
            setCards(cards => cards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
    function handleCardDelete(evt) {
        evt.preventDefault();
        api.handlerdeleteCards(selectedCardDelet._id)
        .then(() => {
            setCards(cards => cards.filter((c) => c._id !== selectedCardDelet._id));
            setIsDeletePopupOpen(false);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function handleDeleteCardClick(card) {
        setSelectedCardDelete(card);
        setIsDeletePopupOpen(true);
    }

    function handleAddPlaceSubmit(item) {
        api.postCards(item)
        .then(newCard => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        });
    }

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

    function handleClosePopupKeyDown(evt) {
        if(evt.key === "Escape") {
            closeAllPopups();
        }
    }

    function handleClosePopupOverlayClick(evt) {
        if(evt.target.classList.contains("popup")) {
            closeAllPopups();
        }
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsDeletePopupOpen(false);
        setSelectedCard({name: "", link: ""});
    }

    function handleUpdateUser(item) {
        api.updateUserData(item)
        .then(res => {
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function handleUpdateAvatar(item) {
        api.updateUserAvatar(item) 
        .then(res => {
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        });
    }

  return (
    <CurrentUserContext.Provider value = {currentUser}>
        <div className="App page">
            <Header />

            <Main 
                onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick}  
                onEditAvatar={handleEditAvatarClick} 
                onCardClick={handleCardClick} 
                onCardLike={handleCardLike} 
                onCardDelite={handleDeleteCardClick}
                onCards={cards}
            />

            <Footer />

            <EditProfilePopup 
                isOpen={isEditProfilePopupOpen} 
                onClose={closeAllPopups} 
                onUpdateUser={handleUpdateUser}
                onCloseKeyDown={handleClosePopupKeyDown}
                onCloseOverlayClick={handleClosePopupOverlayClick}
            />

            <EditAvatarPopup 
                isOpen={isEditAvatarPopupOpen} 
                onClose={closeAllPopups} 
                onUpdateAvatar={handleUpdateAvatar}
                onCloseKeyDown={handleClosePopupKeyDown}
                onCloseOverlayClick={handleClosePopupOverlayClick}
            />

            <AddPlacePopup 
                isOpen={isAddPlacePopupOpen} 
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
                onCloseKeyDown={handleClosePopupKeyDown}
                onCloseOverlayClick={handleClosePopupOverlayClick}
            />

            <ImagePopup 
                card={selectedCard} 
                onClose={closeAllPopups} 
                onCloseKeyDown={handleClosePopupKeyDown}
                onCloseOverlayClick={handleClosePopupOverlayClick}
            />         

            <PopupWithForm 
                name="delete-image" 
                title="Вы уверены?" 
                buttonText="Да" 
                isOpen={isDeletePopupOpen}
                onClose={closeAllPopups}
                onCloseKeyDown={handleClosePopupKeyDown}
                onCloseOverlayClick={handleClosePopupOverlayClick}
                onSubmit={handleCardDelete}
            />
        </div>
    </CurrentUserContext.Provider>    
  );
}

export default App;
