export default class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  _checkServer(res) {
    if (res.ok) { return res.json(); }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._checkServer);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._checkServer);
  }

  setProfile(object) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: object.name,
        about: object.about, })
    }).then(this._checkServer);
  }

  setAvatar(object) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: object.avatar })
    }).then(this._checkServer);
  }

  addLike(object) {
    return fetch(`${this._url}/cards/${object._id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkServer);
  }

  deleteLike(object) {
    return fetch(`${this._url}/cards/${object._id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkServer);
  }

  addCards(object) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: object.name,
        link: object.link })
    }).then(this._checkServer);
  }

  deleteCards(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkServer);
  }
}