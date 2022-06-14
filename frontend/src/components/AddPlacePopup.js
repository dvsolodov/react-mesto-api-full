import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleInputNameChange(e) {
    setName(e.target.value);
  }

  function handleInputLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    onAddPlace({link: link, name: name});
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-form"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText='Сохранить'
    >
      <input className="form__input"
        type="text"
        name="name"
        data-id="input-title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        autoComplete="off"
        value={name}
        onChange={handleInputNameChange}
      />
      <span className="form__error" data-id="error-input-title"></span>
      <input className="form__input"
        type="url"
        name="link"
        data-id="input-link"
        placeholder="Ссылка на картинку"
        required
        autoComplete="off"
        value={link}
        onChange={handleInputLinkChange}
      />
      <span className="form__error" data-id="error-input-link"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
