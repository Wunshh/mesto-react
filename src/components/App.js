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
    const [selectedCard, setSelectedCard] = useState({name: "", link: ""});
    const [currentUser, setCurrentUser] = useState("");
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getInitialCards()
        .then(cardData => {
          setCards(cardData);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    function handleCardLike(card) {
        const isLiked = card.likes.some((item) => {
            return item._id === currentUser._id
        });
      
        api.changeLikeCardStatus(card._id, isLiked)
        .then((newCard) => {
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            setCards(newCards);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
     function handleCardDelete(card) {
        api.handlerdeleteCards(card._id)
        .catch((err) => {
            console.log(err);
        });
    
        const newCardsArray = cards.filter((c) => c._id !== card._id);
        setCards(newCardsArray);
    }

    function handleAddPlaceSubmit(item) {
        debugger
        api.postCards(item)
        .then(newCard => {
            setCards([newCard, ...cards]);
        })
        .catch((err) => {
            console.log(err);
        });

        closeAllPopups();
    }


    useEffect(() => {
        api.getUserInfoFromServer()
        .then(res => {
            setCurrentUser(res);
        })
        .catch((err) => {
            console.log(err);
        });
      }, []);

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
        setSelectedCard({name: "", link: ""});
    }

    function handleUpdateUser(item) {
        api.updateUserData(item)
        .then(res => {
            setCurrentUser(res);
        })
        .catch((err) => {
            console.log(err);
        });
        closeAllPopups();
    }

    function handleUpdateAvatar(item) {
        api.updateUserAvatar(item) 
        .then(res => {
            setCurrentUser(res);
        })
        .catch((err) => {
            console.log(err);
        });
        closeAllPopups();
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
                onCardDelite={handleCardDelete}
                onCards={cards}
            />

            <Footer />

            <EditProfilePopup 
                isOpen={isEditProfilePopupOpen} 
                onClose={closeAllPopups} 
                onUpdateUser={handleUpdateUser}
            />

            <EditAvatarPopup 
                isOpen={isEditAvatarPopupOpen} 
                onClose={closeAllPopups} 
                onUpdateAvatar={handleUpdateAvatar}
            />

            <AddPlacePopup 
                isOpen={isAddPlacePopupOpen} 
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit} 
            />

            <ImagePopup 
                card={selectedCard} 
                onClose={closeAllPopups} 
            />         

            <PopupWithForm name="delete-image" title="Вы уверены?" buttonText="Да" />
        </div>
    </CurrentUserContext.Provider>    
  );
}

export default App;
