function PopupWithForm({name, title, isOpen, onClose, onSubmit, buttonText, children}) {
  return (
    <div className={`popup popup_type_${name}${!isOpen ? '' : ' popup_opened'}`}>
      <div className="popup__container">
        <form className="form" name={name} onSubmit={onSubmit}>
          <h2 className="form__title">{title}</h2>
          {children}
          <button className="form__button" type="submit">{buttonText}</button>
        </form>
        <button className="popup__close-btn" type="button" aria-label="Закрыть" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;

