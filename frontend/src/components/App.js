import {useState, useEffect} from 'react';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import { api } from '../utils/api';
import { auth } from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api.getProfile()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch(err => console.log(err));
      api.getInitialCards()
        .then((cardsData) => {
          setCards(cardsData);
        })
        .catch(err => console.log(err));
      checkToken();
      history.push("/");
      return;
    }

    history.push('/sign-in');
  }, [loggedIn, history]);

  function handleLogin(email, password) {
    auth.login(email, password)
      .then((response) => {
        if (response.status !== 200 || response.status !== 201 ) {
          return;
        }

        setLoggedIn(true)
      })
      .catch(() => {
        setIsRegistered(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleRegister(email, password) {
    return auth.register(email, password)
      .then(() => {
        history.push('/sign-in');
        setIsRegistered(true);
        setIsInfoTooltipOpen(true);
      })
      .catch(() => {
        setIsRegistered(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleSignOut() {
    setLoggedIn(false);
    setEmail('');
  }

  function checkToken() {
    auth.getUserData()
      .then((user) => {
        if (user._id !== undefined) {
          setEmail(user.email);
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
          setEmail('');
        }
      })
      .catch(err => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(err => console.log(err));
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
    setIsImagePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser(currentUser) {
    api.editProfile(currentUser)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(currentUser) {
    api.editAvatar(currentUser)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit(cardData) {
    api.addCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={email}
          handleLogin={handleLogin}
          handleSignOut={handleSignOut}
        />
        <Switch>

          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Footer/>
            {isImagePopupOpen && <ImagePopup
                card={selectedCard}
                isOpen={isImagePopupOpen}
                onClose={closeAllPopups}
              />
            }
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          </ProtectedRoute>

          <Route path="/sign-in">
            <div className="auth-form-container">
              <Login handleLogin={handleLogin} />
            </div>
            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
              isRegistered={isRegistered}
            />
          </Route>

          <Route path="/sign-up">
            <div className="auth-form-container">
              <Register handleRegister={handleRegister} />
            </div>
            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
              isRegistered={isRegistered}
            />
          </Route>

          <Route path="/sign-out">
            <Redirect to="/sign-in" />
          </Route>

          <Route>
            { loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" /> }
          </Route>

        </Switch>


      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
