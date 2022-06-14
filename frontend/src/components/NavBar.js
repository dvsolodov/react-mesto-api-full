import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

function NavBar(props) {
  function signOut(e){
    e.preventDefault();
    props.handleSignOut();
  }

  return (
    <div className="navbar">
      <Route path="/">
        <div className="navbar__email">{props.email !== '' ? props.email : ''}</div>
      </Route>
      <ul className="navbar__nav">
        <Switch>
          <Route exact path="/">
            <li><Link to="/sign-out" className="navbar__link navbar__link_log-out" onClick={signOut}>Выйти</Link></li>
          </Route>
          <Route path="/sign-in">
            <li><Link to="/sign-up" className="navbar__link">Регистрация</Link></li>
          </Route>
          <Route path="/sign-up">
            <li><Link to="/sign-in" className="navbar__link">Войти</Link></li>
          </Route>
        </Switch>
      </ul>
  </div>
  )
}

export default NavBar;
