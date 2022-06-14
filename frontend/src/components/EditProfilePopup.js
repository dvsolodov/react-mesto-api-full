import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onUpdateUser, onClose}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleInputNameChange(e) {
    setName(e.target.value);
  }

  function handleInputDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({name, about: description});
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-form"
      isOpen={isOpen}
      onClose={onClose}
      buttonText='Сохранить'
      onSubmit={handleSubmit}
    >
      <input className="form__input"
        type="text"
        name="name"
        data-id="input-name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        autoComplete="off"
        value={name || ''}
        onChange={handleInputNameChange}
      />
      <span className="form__error" data-id="error-input-name"></span>
      <input className="form__input"
        type="text"
        name="about"
        data-id="input-about"
        placeholder="Род занятий"
        minLength="2"
        maxLength="200"
        required
        autoComplete="off"
        value={description || ''}
        onChange={handleInputDescriptionChange}
      />
      <span className="form__error" data-id="error-input-about"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
