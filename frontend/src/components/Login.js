import { useState } from 'react';

function Login(props) {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    const {name, value} = e.target;
    setInputs((prev) => ({
        ...prev,
        [name]: value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputs.email || !inputs.password) {
      return;
    }
    props.handleLogin(inputs.email, inputs.password);
  }

  return (
    <form className="auth-form" name="login" onSubmit={handleSubmit}>
      <h1 className="auth-form__title">Вход</h1>
      <input className="auth-form__input"
        name="email"
        type="email"
        placeholder="Email"
        required
        value={inputs.email}
        onChange={handleChange}
      />
      <input className="auth-form__input"
        name="password"
        type="password"
        placeholder="Пароль"
        minLength="4"
        maxLength="20"
        required
        value={inputs.password}
        onChange={handleChange}
      />
      <button className="auth-form__submit-btn" type="submit">Войти</button>
    </form>
  );
}

export default Login;
