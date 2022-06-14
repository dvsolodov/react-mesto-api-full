import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const [state, setState] = useState({
    email: '',
    password: '',
    message: ''
  });

  function handleChange(e) {
    const {name, value} = e.target;
    setState((prev) => ({
        ...prev,
        [name]: value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    let { email, password } = state;
    props.handleRegister(email, password);
  }

  return (
    <form className="auth-form" name="login" onSubmit={handleSubmit}>
      <h1 className="auth-form__title">Регистрация</h1>
      <input className="auth-form__input"
        name="email"
        type="email"
        placeholder="Email"
        required
        value={state.email}
        onChange={handleChange}
      />
      <input className="auth-form__input"
        name="password"
        type="password"
        placeholder="Пароль"
        minLength="4"
        maxLength="20"
        required
        value={state.password}
        onChange={handleChange}
      />
      <button className="auth-form__submit-btn" type="submit">Зарегистрироваться</button>
      <p className="auth-form__text">
        Уже зарегистрированы? <Link to="/sign-in" className="auth-form__text auth-form__text_link">Войти</Link>
      </p>
    </form>
  );
}

export default Register;
