import React, { useState, useEffect, useMemo } from 'react';
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

function App() {

  const [isCurrentUser, setCurrentUser] = useState({});

  const [isLoading, setIsloading] = useState(false);

  const [savedMoviesList, setSavedMoviesList] = useState([]);

  const [query, setQuery] = useState('');
  const [querySavedMovies, setQuerySavedMovies] = useState('');

  const history = useHistory();
  const location = useLocation();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const [savedMoviesIds, setSavedMoviesIds] = useState([]);


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

  const [movies, setMovies] = useState(null);
  const [filtredMovieArray, setFiltredMovieArray] = useState([]);
  const [isThumblerActive, setIsThumblerActive] = useState(false);

  const [moviesNotFind, setMoviesNotFind] = useState(false);

  function handleInputChange(e) {
    setQuery(e.target.value)
  }

  function handleInputSavedMoviesChange(e) {
    setQuerySavedMovies(e.target.value)
  }

  useEffect(() => {
    if (!movies && (query.length > 0 || isThumblerActive)) {

      moviesApi.getMovies()
        .then((res) => {
          localStorage.setItem('movies', JSON.stringify(res));
          setMovies(res);
        })
        .catch((err) => console.log(`${err}`))

    }
  }, [movies, query, isThumblerActive])

  const filteredMovies = useMemo(() => {
    if (!movies) {
      return [];
    }

    return movies.filter((items) => items.nameRU.toLowerCase().includes(query.toLowerCase())).filter((items) => (!isThumblerActive || items.duration < 40))

  }, [movies, query, isThumblerActive])

  const handleMovieSearch = () => {
    setIsloading(true);
    setTimeout(() => {
      localStorage.setItem('query', `${query}`);
      localStorage.setItem('moviesFiltered', JSON.stringify(filteredMovies));
      console.log('спустила на стр')

      setFiltredMovieArray(filteredMovies);

      setIsloading(false);
    }, 2000)
  }

  const toggleThumbler = () => {
    setIsThumblerActive(!isThumblerActive);
    localStorage.setItem('thumbler', !isThumblerActive);
  }

  useEffect(() => {
    mainApi.getUserMovies()
      .then((res) => {
        if (res) {
          setSavedMoviesList(res)
        }
      })
      .catch((err) => console.log(`${err}`));
  }, [])

  const [filteredSavedList, setFilteredSavedList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheck = () => {
    setIsChecked(!isChecked)
  }

  const filteredSavedMovies = useMemo(() => {
    if (querySavedMovies.length === 0 && isChecked) {
      return savedMoviesList
    }
    return savedMoviesList.filter((movies) => movies.nameRU.toLowerCase().includes(querySavedMovies.toLowerCase())).filter((movies) => (!isChecked || movies.duration < 40));

  }, [savedMoviesList, querySavedMovies, isChecked])

  const handleSavedMovieSearch = () => {
    setIsloading(true);
    setTimeout(() => {
      setFilteredSavedList(filteredSavedMovies);

      setIsloading(false);
    }, 600)
  }

  useEffect(() => {

    if (isChecked) {
      setFilteredSavedList(savedMoviesList.filter((movies) => movies.nameRU.toLowerCase().includes(querySavedMovies.toLowerCase())).filter((movies) => (!isChecked || movies.duration < 40)))
    } else (
      setFilteredSavedList(savedMoviesList))
  }, [savedMoviesList, querySavedMovies, isChecked])

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


  const localFiltredMovie = localStorage.getItem('moviesFiltered');
  const localQuery = localStorage.getItem('query');
  const localThumbler = JSON.parse(localStorage.getItem('thumbler'));

  useEffect(() => {

    if (localFiltredMovie === null && localQuery === null) {
      setFiltredMovieArray([])
    } else if (JSON.parse(localFiltredMovie).length === 0 && localQuery.length > 0) {
      setIsloading(true)
      setQuery(localQuery)
      setIsloading(false)
      setIsThumblerActive(localThumbler)
      setMoviesNotFind(true)
    } else {
      setMoviesNotFind(false)
      setIsloading(true)
      setQuery(localQuery)
      setFiltredMovieArray(JSON.parse(localFiltredMovie))
      setIsloading(false)
      setIsThumblerActive(localThumbler)
    }
  }, [localFiltredMovie, localQuery, localThumbler])

  const signOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    history.push('/');
  }

  return (
    <CurrentUserContext.Provider value={isCurrentUser}>
      <Route exact path={['/', '/movies', '/saved-movies', '/profile']}>
        <Header loggedIn={loggedIn} />
      </Route>

      <Switch>

        <Route exact path="/" component={Main} />

        <ProtectedRoute exact path="/movies" component={Movies} loggedIn={loggedIn} onSearch={handleMovieSearch} onChange={handleInputChange} query={query} isThumblerActive={isThumblerActive} toggleThumbler={toggleThumbler} isLoading={isLoading} moviesList={filtredMovieArray} moviesNotFind={moviesNotFind} onMovieSave={onMovieSave} deleteMovie={deleteMovie} savedMoviesIds={savedMoviesIds} />

        <ProtectedRoute exact path="/saved-movies" component={SavedMovies} loggedIn={loggedIn} newMoviesList={filteredSavedList} onMovieDelete={onMovieDelete} onSearch={handleSavedMovieSearch} onChange={handleInputSavedMoviesChange} query={querySavedMovies} isChecked={isChecked} toggleThumbler={toggleCheck} isLoading={isLoading} moviesNotFind={moviesNotFind} />

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
