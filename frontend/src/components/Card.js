import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardDelete, onCardLike}) {
  const cardData = card;
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `photo__delete-btn${isOwn ? '' : ' photo__delete-btn_invisible'}`;
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = `photo__like-btn${isLiked ? ' photo__like-btn_active' : ''}`;

  function handleClick() {
    onCardClick(cardData);
  }

  function handleLikeClick() {
    onCardLike(cardData);
  }
  function handleCardDelete() {
    onCardDelete(cardData);
  }

  return (
    <article className="photo">
      <div className="photo__img-wrapper">
        <img className="photo__img" src={cardData.link} alt={cardData.name} onClick={handleClick} />
      </div>
      <div className="photo__caption">
        <h2 className="photo__title">{cardData.name}</h2>
        <div className="photo__likes-block">
          <button className={cardLikeButtonClassName} type="button" aria-label="Нравится" onClick={handleLikeClick}></button>
          <span className="photo__likes-counter">{cardData.likes.length}</span>
        </div>
      </div>
      <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить" onClick={handleCardDelete}></button>
    </article>
  );
}

export default Card;

