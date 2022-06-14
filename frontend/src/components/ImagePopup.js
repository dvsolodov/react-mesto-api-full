function ImagePopup({card, isOpen, onClose}) {
  return (
    <div className={`popup${!isOpen ? '' : ' popup_opened'}`}>
      <div className="popup__container">
        <figure className="view-photo">
          <img className="view-photo__img" id="photo-img" src={card.link} alt={card.name} />
          <figcaption className="view-photo__caption" id="photo-caption">{card.name}</figcaption>
        </figure>
        <button className="popup__close-btn" type="button" aria-label="Закрыть" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;

