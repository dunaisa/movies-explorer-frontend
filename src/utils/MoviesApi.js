class Api {
  constructor({ url }) {
    this._url = url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Получение карточек с сервера

  getMovies() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        "Accept": "application/json"
      }
    })
      .then(this._checkResponse);
  }
}

export const moviesApi = new Api({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});
