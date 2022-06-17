class Api {
  constructor() {
    this._baseUrl = "https://api.solodov.students.nomoredomains.xyz";
    this._token = localStorage.getItem('_token');
    this._paramProfile = "/users/me/";
    this._paramAvatar = "/users/me/avatar/";
    this._paramCards = "/cards/";
    this._paramLikes = "/likes/";
    this._headers = {
      authorization: this._token,
      'Content-Type': 'application/json'
    };
  }

  getProfile() {
    return fetch(`${this._baseUrl}${this._paramProfile}`, {headers: this._headers})
      .then((response) => this._checkResponse(response));
  }

  editProfile({name, about}) {
    return fetch(`${this._baseUrl}${this._paramProfile}`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({name, about})
      })
      .then((response) => this._checkResponse(response));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}${this._paramCards}`, {headers: this._headers})
      .then((response) => this._checkResponse(response));
  }

  addCard({name, link}) {
    return fetch(`${this._baseUrl}${this._paramCards}`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({name, link})
      })
      .then((response) => this._checkResponse(response));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}${this._paramCards}${cardId}`, {
        method: "DELETE",
        headers: this._headers
      })
      .then((response) => this._checkResponse(response));
  }

  editAvatar(avatarObj) {
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
    return fetch(`${this._baseUrl}${this._paramCards}${cardId}${this._paramLikes}`, {
        method: "PUT",
        headers: this._headers
      })
      .then((response) => this._checkResponse(response));
  }

  _removeLike(cardId) {
    return fetch(`${this._baseUrl}${this._paramCards}${cardId}${this._paramLikes}`, {
        method: "DELETE",
        headers: this._headers
      })
      .then((response) => this._checkResponse(response));
  }

  _checkResponse(response) {
    console.log(response.headers)
    return response.ok ? response.json() : Promise.reject(`Ошибка запроса: ${response.status}`);
  }
}

const api = new Api();

export {api};
