import {useContext} from 'react';
import Card from "../components/Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";


function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelite, onCards}) {

  const currentUser = useContext(CurrentUserContext);

    return(
        <main>
            <section className="profile">
                <div className="profile__avatar-container">
                    <img className="profile__avatar" onClick={onEditAvatar} src={currentUser.avatar} alt="Фото профиля" />
                </div>
                <div className="profile__info"> 
                    <div className="profile__container">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button onClick={onEditProfile} type="submit" className="profile__edit-button"></button>
                    </div>
                    <p className="profile__career">{currentUser.about}</p>
                </div>
                <button onClick={onAddPlace} type="button" className="profile__add-button"></button>
            </section>

            <section className="grid-galery">
                {onCards.map((card) => {
                   return <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelite} />
                })}
            </section>
        </main> 
    );
}

export default Main;