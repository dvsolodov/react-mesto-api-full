import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen] );

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({link: avatarRef.current.value});
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar-form"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText='Сохранить'
      >
        <input className="form__input"
        type="url"
        name="link"
        data-id="input-link"
        placeholder="Ссылка на картинку"
        required
        autoComplete="off"
        ref={avatarRef}
      />
      <span className="form__error" data-id="error-input-link"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
