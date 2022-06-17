class Api {
  constructor() {
    this._baseUrl = "https://api.solodov.students.nomoredomains.xyz";
    this._paramProfile = "/users/me/";
    this._paramAvatar = "/users/me/avatar/";
    this._paramCards = "/cards/";
    this._paramLikes = "/likes/";
    this._headers = {
      'Content-Type': 'application/json'
    };
  }

  getProfile() {
    this._addTokenToHeaders();

    return fetch(`${this._baseUrl}${this._paramProfile}`, {headers: this._headers})
      .then((response) => this._checkResponse(response));
  }

  editProfile({name, about}) {
    this._addTokenToHeaders();

    return fetch(`${this._baseUrl}${this._paramProfile}`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({name, about})
      })
      .then((response) => this._checkResponse(response));
  }

  getInitialCards() {
    this._addTokenToHeaders();

    return fetch(`${this._baseUrl}${this._paramCards}`, {headers: this._headers})
      .then((response) => this._checkResponse(response));
  }

  addCard({name, link}) {
    this._addTokenToHeaders();

    return fetch(`${this._baseUrl}${this._paramCards}`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({name, link})
      })
      .then((response) => this._checkResponse(response));
  }

  deleteCard(cardId) {
    this._addTokenToHeaders();

    return fetch(`${this._baseUrl}${this._paramCards}${cardId}`, {
        method: "DELETE",
        headers: this._headers
      })
      .then((response) => this._checkResponse(response));
  }

  editAvatar(avatarObj) {
    this._addTokenToHeaders();

    return fetch(`${this._baseUrl}${this._paramAvatar}`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({avatar: avatarObj.link})
      })
      .then((response) => this._checkResponse(response));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._removeLike(cardId);
    } else {
      return this._addLike(cardId);
    }
  }

  _addLike(cardId) {
    this._addTokenToHeaders();

    return fetch(`${this._baseUrl}${this._paramCards}${cardId}${this._paramLikes}`, {
        method: "PUT",
        headers: this._headers
      })
      .then((response) => this._checkResponse(response));
  }

  _removeLike(cardId) {
    this._addTokenToHeaders();

    return fetch(`${this._baseUrl}${this._paramCards}${cardId}${this._paramLikes}`, {
        method: "DELETE",
        headers: this._headers
      })
      .then((response) => this._checkResponse(response));
  }

  _checkResponse(response) {
    return response.ok ? response.json() : Promise.reject(`Ошибка запроса: ${response.status}`);
  }

  _addTokenToHeaders() {
    this._headers["Authorization"] = `Bearer ${localStorage.getItem('_token')}`;
  }

}

const api = new Api();

export {api};
