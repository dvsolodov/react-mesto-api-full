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
            <li><Link to="/signout" className="navbar__link navbar__link_log-out" onClick={signOut}>Выйти</Link></li>
          </Route>
          <Route path="/signin">
            <li><Link to="/signup" className="navbar__link">Регистрация</Link></li>
          </Route>
          <Route path="/signup">
            <li><Link to="/signin" className="navbar__link">Войти</Link></li>
          </Route>
        </Switch>
      </ul>
  </div>
  )
}

export default NavBar;
