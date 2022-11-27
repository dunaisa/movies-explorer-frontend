class MainApi {
  constructor({ url }) {
    this._url = url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    if (res.status === 409) {
      return Promise.reject(`Такая почта уже существует. `);
    } if (res.status === 400) {

    } else {
      return Promise.reject('Ошибка сервера.');
    }
  }

  //Получение карточек с сервера

  getUserMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        "Accept": "application/json"
      }
    })
      .then(this._checkResponse);
  }

  // Отправка карточек на сервер

  setUserMovies(data) {

    const movieBody = {
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: (data.image).toString().slice(28),
      trailerLink: data.trailerLink,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
      thumbnail: `https://api.nomoreparties.co${data.image.url}`,
      movieId: data.id
    }
    console.log(movieBody)
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
      body: JSON.stringify(movieBody)
    })
      .then(this._checkResponse);
  }

  // // Загрузка информации о пользователе с сервера

  // getInfo() {
  //   return fetch(`${this._url}/users/me`, {
  //     method: 'GET',
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem('token')}`,
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(this._checkResponse);
  // }

  // Загрузка информации о пользователе на сервер

  setInfo(data) {
    const userInfoBody = {
      name: data.name,
      email: data.email,
    }
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfoBody)
    })
      .then(this._checkResponse);
  }

  // toggleLike(cardId, isLiked) {
  //   return fetch(`${this._url}/cards/${cardId}/likes`, {
  //     method: isLiked ? 'DELETE' : 'PUT',
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem('token')}`,
  //       'Content-Type': 'application/json'
  //     },
  //   })
  //     .then(this._checkResponse);
  // }

  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._checkResponse);
  }
}

export const mainApi = new MainApi({
  url: 'http://localhost:3001',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});