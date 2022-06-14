import logo from '../images/header-logo.svg';
import NavBar from './NavBar';

function Header(props) {
  return (
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип" />
        <NavBar
          email={props.email}
          handleLogin={props.handleLogin}
          handleSignOut={props.handleSignOut}
        />
      </header>
  );
}

export default Header;

