export const BASE_URL = 'https://api.beatfilm-movies.nomoredomains.icu';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  if (res.status === 409) {
    return Promise.reject(`Ошибка ${res.status}: Такая почта уже существует. `);
  }
  if (res.status === 403) {
    return Promise.reject(`Ошибка ${res.status}: Неправильная почта или пароль. `);
  }
}

export const register = ({ name, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  })
    .then(checkResponse)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        return res;
      }
    })
};

export const authorize = ({ email, password }) => {
  console.log('ok')
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then(checkResponse)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        return res;
      }
    })
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(checkResponse)
}
