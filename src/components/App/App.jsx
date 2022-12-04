import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, useHistory, Redirect } from 'react-router-dom';
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

function App() {

  const [isCurrentUser, setCurrentUser] = useState({});

  const [isLoading, setIsloading] = useState(false);

  const [savedMoviesList, setSavedMoviesList] = useState([]);

  const [query, setQuery] = useState('');
  const [querySavedMovies, setQuerySavedMovies] = useState('');

  const history = useHistory();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const [savedMoviesIds, setSavedMoviesIds] = useState([]);

  // const [isAuth, setIsAuth] = useState(false);
  // const [isError, setIsError] = useState(false);

  useEffect(() => {
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
            }
          })
          .catch((err) => console.log(`${err}`))
      }
    }
    tokenCheck()
  }, [loggedIn])

  const navigate = useHistory();

  useEffect(() => {
    window.onbeforeunload = () => {
      window.sessionStorage.setItem('lastRoute', JSON.stringify(window.location.pathname))
    }
    navigate.push(JSON.parse(window.sessionStorage.getItem('lastRoute') || '{}'))
  }, [loggedIn])

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

  const [movies, setMovies] = useState([]);
  const [moviesNotFind, setMoviesNotFind] = useState(false);

  function handleInputChange(e) {
    setQuery(e.target.value)
  }

  function handleInputSavedMoviesChange(e) {
    setQuerySavedMovies(e.target.value)
  }

  const [filtredMovieArray, setFiltredMovieArray] = useState([]);
  const [isThumblerActive, setIsThumblerActive] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [filterShortFilm, setFilterShortFilm] = useState([]);
  const [filterShortSavedFilm, setFilterShortSavedFilm] = useState([]);

  const toggleThumbler = () => {
    setIsThumblerActive(!isThumblerActive)
  }

  const toggleCheck = () => {
    setIsChecked(!isChecked)
  }

  // const searchKey = ["nameRU"]

  const filteredMovies = movies.filter((items) =>
    items.nameRU.toLowerCase().includes(query.toLowerCase())
  )

  const filteredSavedMovies = savedMoviesList.filter((items) =>
    items.nameRU.toLowerCase().includes(querySavedMovies.toLowerCase())
  )

  const findShortMovies = filteredMovies.filter((item) => item.duration < 40);


  const findShortSavedMovies = savedMoviesList.filter((item) => item.duration < 40);

  const handleMovieSearch = () => {
    localStorage.setItem('query', `${query}`);
    localStorage.setItem('movies', JSON.stringify(filteredMovies));
    localStorage.setItem('thumbler', isThumblerActive);
    setFiltredMovieArray(filteredMovies)
  }

  const handleSavedMovieSearch = () => {
    setSavedMoviesList(filteredSavedMovies)
  }

  const handleShortMovies = () => {
    setFilterShortFilm(findShortMovies)
  }

  const handleShortSavedMovies = () => {
    setFilterShortSavedFilm(findShortSavedMovies)
  }

  const localMovie = localStorage.getItem('movies');
  const localQuery = localStorage.getItem('query');
  const localThumbler = JSON.parse(localStorage.getItem('thumbler'));

  useEffect(() => {

    moviesApi.getMovies()
      .then((res) => {
        setIsloading(true);
        setMovies(res);
      })
      .catch((err) => console.log(`${err}`))
      .finally(() => {
        setIsloading(false)
      })
  }, [])

  // dictionary

  // const [dic, setDic] = useState({});

  const onMovieSave = (data) => {
    mainApi.setUserMovies(data)
      .then((res) => {
        setSavedMoviesList([res, ...savedMoviesList])
      })
  }

  useEffect(() => {
    setSavedMoviesIds(savedMoviesList.map((film) => film.movieId))
  }, [savedMoviesList])

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

  useEffect(() => {
    mainApi.getUserMovies()
      .then((res) => {
        if (res) {
          setSavedMoviesList(res)
        }
      })
  }, [])

  useEffect(() => {

    if (localMovie === null && localQuery === null) {
      setFiltredMovieArray([])
    } else if (JSON.parse(localMovie).length === 0 && localQuery.length > 0) {
      setIsloading(true)
      setQuery(localQuery)
      setIsloading(false)
      setIsThumblerActive(localThumbler)
      setMoviesNotFind(true)
    } else {
      setMoviesNotFind(false)
      setIsloading(true)
      setQuery(localQuery)
      setFiltredMovieArray(JSON.parse(localMovie))
      setIsloading(false)
      setIsThumblerActive(localThumbler)
    }
  }, [localMovie, localQuery, localThumbler])



  const signOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/');
  }

  return (
    <CurrentUserContext.Provider value={isCurrentUser}>

      <Switch>
        <Route exact path="/">
          <Header headerClassName="header header_type_intro">
            <ul className="header__items">
              <li className="header__item">
                <Link className="header__link header__link_type_signup" to="/signup">Регистрация</Link>
              </li>

              <li className="header__item">
                <Link className="header__link header__link_type_signin" to="/signin">Войти</Link>
              </li>
            </ul>
          </Header>
          <Main />
          <Footer />
        </Route>

        <ProtectedRouteAuth exact path="/signin" component={Login} loggedIn={loggedIn} onLogin={handleOnLogin} isError={isError} errorMessage={errorMessage} />

        <ProtectedRouteAuth exact path="/signup" component={Register} loggedIn={loggedIn} onRegister={handleOnRegister} isError={isError} errorMessage={errorMessage} />

        <ProtectedRoute exact path="/movies" component={Movies} loggedIn={loggedIn} onSearch={handleMovieSearch} onChange={handleInputChange} query={query} isThumblerActive={isThumblerActive} toggleThumbler={toggleThumbler} isLoading={isLoading} moviesList={isThumblerActive ? filterShortFilm : filtredMovieArray} moviesNotFind={moviesNotFind} onMovieSave={onMovieSave} deleteMovie={deleteMovie} savedMoviesIds={savedMoviesIds} handleShortMovies={handleShortMovies} />

        <ProtectedRoute exact path="/saved-movies" component={SavedMovies} loggedIn={loggedIn} newMoviesList={isChecked ? filterShortSavedFilm : savedMoviesList} onMovieDelete={onMovieDelete} onSearch={handleSavedMovieSearch} onChange={handleInputSavedMoviesChange} query={querySavedMovies} isChecked={isChecked} toggleThumbler={toggleCheck} isLoading={isLoading} handleShortMovies={handleShortSavedMovies} />

        <ProtectedRoute exact path="/profile" component={Profile} loggedIn={loggedIn} onEdit={handleEditProfile} signOut={signOut} isError={isError} errorMessage={errorMessage} />

        <Route exact path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
