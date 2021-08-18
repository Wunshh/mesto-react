import {useEffect, useState} from 'react';
import api from "../utils/api";
import Card from "../components/Card.js";

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {

  const [userName, setUserName] = useState("Жак-Ив Кусто");
  const [userDescription, setUserDescription] = useState("Исследователь океана");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
      api.getInitialCards(cards)
      .then(res => {
          const arr = res.map((item) => {
              return {
                  src: item.link,
                  alt: item.name,
                  title: item.name,
                  like: item.likes.length,
                  id: item._id,
                  ownerId: item.owner._id
              }
         })
          setCards(arr);
      })
      .catch((err) => {
          console.log(err);
      })
  }, []);

  useEffect(() => {
    api.getUserInfoFromServer(userAvatar, userName, userDescription)
    .then(res => {
      const userData = {
          avatar: res.avatar,
          name: res.name,
          about: res.about,
          id: res._id,
      };
      setUserAvatar(userData.avatar);
      setUserName(userData.name);
      setUserDescription(userData.about);
    })
    .catch((err) => {
        console.log(err);
    });
  });

    return(
        <main>
            <section className="profile">
                <div className="profile__avatar-container">
                    <img className="profile__avatar" onClick={onEditAvatar} src={userAvatar} alt="Фото профиля" />
                </div>
                <div className="profile__info"> 
                    <div className="profile__container">
                        <h1 className="profile__name">{userName}</h1>
                        <button onClick={onEditProfile} type="submit" className="profile__edit-button"></button>
                    </div>
                    <p className="profile__career">{userDescription}</p>
                </div>
                <button onClick={onAddPlace} type="button" className="profile__add-button"></button>
            </section>

            <section className="grid-galery">
                {cards.map((card) => {
                   return <Card key={card.id} card={card} onCardClick={onCardClick} />
                })}
            </section>
        </main> 
    );
}

export default Main;