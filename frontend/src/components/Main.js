import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardDelete, onCardLike}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-wrap">
            <div className="profile__avatar-overlay"
              id="edit-avatar-popup-btn"
              onClick={onEditAvatar}
            ></div>
            {currentUser && (<img className="profile__avatar" id="profile-info-avatar" src={currentUser.avatar} alt="Аватар" />)}
          </div>
          <div className="profile-info">
            <h1 className="profile-info__name" id="profile-info-name">{currentUser.name}</h1>
            <p className="profile-info__about" id="profile-info-about">{currentUser.about}</p>
            <button className="profile-info__edit-btn"
              id="edit-popup-btn"
              type="button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            ></button>
          </div>
          <button className="profile__add-btn"
              id="add-popup-btn"
              type="button"
              aria-label="Добавить картинку"
              onClick={onAddPlace}
          ></button>
        </section>

        <section className="photos" id="photos">
          {
            cards.map((card) => (
              <Card card={card}
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))
          }
        </section>

      </main>
  );
}

export default Main;

