import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import Header from '../Header/Header'
import Movies from '../Movies/Movies';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import * as auth from '../../utils/Auth';
import ProtectedRouteAuth from '../ProtectedRouteAuth.jsx';
import { SHORT_MOVIE_DURATION } from '../../constants/constants';

function App() {

  // console.log('render App')

  const [isCurrentUser, setCurrentUser] = useState({});

  const [isLoading, setIsloading] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const [savedMoviesIds, setSavedMoviesIds] = useState([]);

  // Стейты для всех фильмов

  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);
  const [isThumblerActive, setIsThumblerActive] = useState(false);

  // Стейты для сохраненных фильмов

  const [querySavedMovies, setQuerySavedMovies] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [savedMoviesList, setSavedMoviesList] = useState([]);

  // Стейты в хранилище

  const localFiltredMovie = localStorage.getItem('moviesFiltered');
  const localQuery = localStorage.getItem('query');
  const localThumbler = JSON.parse(localStorage.getItem('thumbler'));

  // Сообщение об ошибке

  const [isServerError, setIsServerError] = useState(false);

  // const [isFirstLoad, setIsFirstLoad] = useState(true);

  // const handleFirstPageLoading = (state) => {
  //   // console.log(state)
  //   setIsFirstLoad(state)
  // }

  useEffect(() => {
    const path = location.pathname;
    function tokenCheck() {
      // если у пользователя есть токен в localStorage, 
      // эта функция проверит, действующий он или нет
      const jwt = localStorage.getItem('token');
      if (jwt) {
        // здесь будем проверять токен
        auth.getContent(jwt)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              history.push(path);
            }
          })
          .catch((err) => console.log(`${err}`))
      }
    }
    tokenCheck()
  }, [loggedIn, history])

  useEffect(() => {
    if (loggedIn === true) {
      mainApi.getInfo()
        .then((res) => {
          setCurrentUser(res)
        })
        .catch((err) => console.log(`${err}`))
    }

  }, [loggedIn])

  const handleOnRegister = ({ name, email, password }) => {
    auth.register({ name, email, password })
      .then((res) => {
        console.log(res)
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => {
        setErrorMessage((`${err}`))
        setIsError(true)
      })
      .finally(() => {
        setTimeout(() => {
          setIsError(false)
        }, 3000);
      })
  }

  function handleOnLogin({ email, password }) {
    auth.authorize({ email, password })
      .then(() => {
        setLoggedIn(true);
        history.push('/movies');

      })
      .catch((err) => {
        setErrorMessage((`${err}`))
        setIsError(true)
      })
      .finally(() => {
        setTimeout(() => {
          setIsError(false)
        }, 3000);
      })
  }

  const handleEditProfile = (data) => {
    mainApi.setInfo(data)
      .then((res) => {
        setCurrentUser(res)
        setErrorMessage('Смена данных успешно произведена!')
        setIsError(true)

      })
      .catch((err) => {
        setErrorMessage((`${err}`))
        setIsError(true)
      })
      .finally(() => {
        setTimeout(() => {
          setIsError(false)
        }, 3000);
      })
  }

  // Функционал для основных фильмов

  // Установка значений в инпут, чекбокс через хендлер

  useEffect(() => {
    if (localStorage.getItem('query') || localStorage.getItem('thumbler')) {
      handleInputChange(localStorage.getItem('query') ?? '');
      handleThumblerChange(JSON.parse(localStorage.getItem('thumbler')) ?? false);

    }
  }, [])

  const handleInputChange = useCallback((value) => {
    localStorage.setItem('query', value);
    setQuery(value)

  }, [])

  const handleThumblerChange = useCallback((state) => {
    localStorage.setItem('thumbler', JSON.parse(state));
    setIsThumblerActive(state)

  }, [])

  // Получение фильмов с бит-мувис

  useEffect(() => {
    if (!movies && (!!query || isThumblerActive)) {
      setIsServerError(false)
      if (localStorage.getItem('movies')) {
        setMovies(JSON.parse(localStorage.getItem('movies')));
      } else {
        moviesApi.getMovies()
          .then((res) => {

            setMovies(res)
            localStorage.setItem('movies', JSON.stringify(res));
          })
          .catch((err) => {
            console.log(`${err}`)
            setIsServerError(true)
          });
      }
    }
    // }
  }, [movies, query, isThumblerActive])

  // Мемоизация основных фильтрованных фильмов

  const filteredMovies = useMemo(() => {
    if (!movies) {
      return null;
    } else {
      return movies.filter((items) => {
        if (isThumblerActive) {
          const shortMovies = (items.nameRU.toLowerCase().includes(query.toLowerCase()) && items.duration < SHORT_MOVIE_DURATION)
          return shortMovies
        } else {
          const allMovies = items.nameRU.toLowerCase().includes(query.toLowerCase())
          return allMovies
        }
      })
    }

  }, [movies, query, isThumblerActive])

  // Функционал для сохраненных фильмов

  useEffect(() => {
    mainApi.getUserMovies()
      .then((res) => {
        if (res) {
          setIsServerError(false)
          setSavedMoviesList(res)
        }
      })
      .catch((err) => {
        console.log(`${err}`)
        setIsServerError(true)
      });
  }, [])

  const onSavedInputChange = useCallback((value) => {
    setQuerySavedMovies(value)
  }, [])

  const handleCheckBoxChange = useCallback((state) => {
    setIsChecked(state)
  }, [])

  // Мемоизация сохраненных фильмов

  const filteredSavedMovies = useMemo(() => {
    if (querySavedMovies.length === 0 && !isChecked) {
      return savedMoviesList
    } else {
      return savedMoviesList.filter((items) => {
        if (isChecked) {
          const shortMovies = (items.nameRU.toLowerCase().includes(querySavedMovies.toLowerCase()) && items.duration < SHORT_MOVIE_DURATION)
          return shortMovies
        } else {
          const allMovies = items.nameRU.toLowerCase().includes(querySavedMovies.toLowerCase())
          return allMovies
        }
      })
    }

  }, [savedMoviesList, querySavedMovies, isChecked])

  // Сохранение фильмов

  const onMovieSave = (data) => {
    mainApi.setUserMovies(data)
      .then((res) => {
        setSavedMoviesList([res, ...savedMoviesList])
      })
      .catch((err) => console.log(`${err}`));
  }

  useEffect(() => {
    setSavedMoviesIds(savedMoviesList.map((film) => film.movieId))
  }, [savedMoviesList])

  // Удаление фильмов

  const onMovieDelete = (_id) => {
    mainApi.deleteMovie(_id)
      .then(() => {
        setSavedMoviesList(savedMoviesList.filter((movie) => movie._id !== _id))
      })
      .catch((err) => console.log(`${err}`))
  }

  const deleteMovie = (_id) => {
    const item = savedMoviesList.find((movie) => {
      return (movie.owner === isCurrentUser._id && movie.movieId === _id)
    })
    setSavedMoviesList(savedMoviesList.filter((movie) => {
      return movie !== item
    }))
  }

  const signOut = () => {
    localStorage.clear();
    setQuery('');
    setMovies(null);
    setLoggedIn(false);
    setIsThumblerActive(false);
    history.push('/');
  }

  return (
    <CurrentUserContext.Provider value={isCurrentUser}>
      <Route exact path={['/', '/movies', '/saved-movies', '/profile']}>
        <Header loggedIn={loggedIn} />
      </Route>

      <Switch>

        <Route exact path="/" component={Main} />

        <ProtectedRoute exact path="/movies" component={Movies} loggedIn={loggedIn} handleInputChange={handleInputChange} handleThumblerChange={handleThumblerChange} isLoading={isLoading} setIsloading={setIsloading} moviesList={filteredMovies} onMovieSave={onMovieSave} deleteMovie={deleteMovie} savedMoviesIds={savedMoviesIds} isMainPage={true} localValue={localStorage.getItem('query')} localThumblerState={JSON.parse(localStorage.getItem('thumbler'))} isServerError={isServerError} />

        <ProtectedRoute exact path="/saved-movies" component={SavedMovies} loggedIn={loggedIn} newMoviesList={filteredSavedMovies} onMovieDelete={onMovieDelete} isLoading={isLoading} isMainPage={false} onSavedInputChange={onSavedInputChange} handleCheckBoxChange={handleCheckBoxChange} isServerError={isServerError} />

        <ProtectedRoute exact path="/profile" component={Profile} loggedIn={loggedIn} onEdit={handleEditProfile} signOut={signOut} isError={isError} errorMessage={errorMessage} />

        <ProtectedRouteAuth exact path="/signin" component={Login} loggedIn={loggedIn} onLogin={handleOnLogin} isError={isError} errorMessage={errorMessage} />

        <ProtectedRouteAuth exact path="/signup" component={Register} loggedIn={loggedIn} onRegister={handleOnRegister} isError={isError} errorMessage={errorMessage} />

        <Route path="/*" component={PageNotFound} />

      </Switch>

      <Route exact path={['/', '/movies', '/saved-movies', '/profile']}>
        <Footer />
      </Route>

    </CurrentUserContext.Provider>
  );
}

export default App;
