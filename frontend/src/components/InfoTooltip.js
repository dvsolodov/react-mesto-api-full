import iconOk from '../images/info-tooltip-ok.svg';
import iconBad from '../images/info-tooltip-bad.svg';

function InfoTooltip({isRegistered, isOpen, onClose}) {
  return (
    <div className={`popup${!isOpen ? '' : ' popup_opened'}`}>
      <div className="popup__container">
        <div className="info-tooltip">
          <img className="info-tooltip__icon"
            id="photo-img"
            src={isRegistered ? iconOk : iconBad}
            alt="Иконка статуса регистрации"
          />
          <h2 className="info-tooltip__message">
            {isRegistered ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
          </h2>
        </div>
        <button className="popup__close-btn" type="button" aria-label="Закрыть" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
