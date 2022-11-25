class MainApi {
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

  getUserMovies() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: {
        // authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        "Accept": "application/json"
      }
    })
      .then(this._checkResponse);
  }

  // Отправка карточек на сервер

  setInitialCards(data) {

    const movieBody = {
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: `https://api.nomoreparties.co${data.image.url}`,
      trailerLink: data.trailerLink,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
      thumbnail: `https://api.nomoreparties.co${data.image.url}`,
      // thumbnail: `https://api.nomoreparties.co${data.image.url}`,
      movieId: data.id
    }
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

  // setInfo(data) {
  //   const userInfoBody = {
  //     name: data.name,
  //     about: data.about,
  //   }
  //   return fetch(`${this._url}/users/me`, {
  //     method: 'PATCH',
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem('token')}`,
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(userInfoBody)
  //   })
  //     .then(this._checkResponse);
  // }

  // setAvatar(data) {
  //   const userAvatarBody = {
  //     avatar: data.avatar,
  //   }
  //   return fetch(`${this._url}/users/me/avatar`, {
  //     method: 'PATCH',
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem('token')}`,
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(userAvatarBody)
  //   })
  //     .then(this._checkResponse);
  // }

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

  // deleteCard(cardId) {
  //   return fetch(`${this._url}/cards/${cardId}`, {
  //     method: 'DELETE',
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem('token')}`,
  //       'Content-Type': 'application/json'
  //     },
  //   })
  //     .then(this._checkResponse);
  // }
}

export const mainApi = new MainApi({
  url: 'http://localhost:3001',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});