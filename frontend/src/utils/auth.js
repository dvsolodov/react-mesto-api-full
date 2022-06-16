class Auth {
  constructor() {
    this._baseUrl = "https://solodov.students.nomoredomains.xyz/";
    this._paramRegister = "/signup";
    this._paramLogin = "/signin";
    this._paramCheckToken = "/users/me/";
    this._headers = {
      "Content-Type": "application/json"
    };
  }

  getUserData() {
    return fetch(`${this._baseUrl}${this._paramCheckToken}`, { headers: this._headers })
      .then((response) => this._checkResponse(response));
  }

  register(email, password) {
    return fetch(`${this._baseUrl}${this._paramRegister}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    })
      .then((response) => this._checkResponse(response));
  }

  login(email, password) {
    return fetch(`${this._baseUrl}${this._paramLogin}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    })
      .then((response) => this._checkResponse(response));
  }

  _checkResponse(response) {
    return response.ok ? response.json() : Promise.reject(`Ошибка запроса: ${response.status}`);
  }
}

const auth = new Auth();

export { auth };

