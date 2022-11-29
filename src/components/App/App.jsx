import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, NavLink, useHistory, Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import Header from '../Header/Header'
import Movies from '../Movies/Movies';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
// import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import * as auth from '../../utils/Auth';

function App() {

  const [isCurrentUser, setCurrentUser] = useState({});

  const [isLoading, setIsloading] = useState(false);

  const [savedMoviesList, setSavedMoviesList] = useState([]);

  const [query, setQuery] = useState('');

  const history = useHistory();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const [isUserName, setIsUserName] = useState('');
  const [isUserEmail, setIsUserEmail] = useState('');

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
              //Установим в профайле имя и почту юзера
              setIsUserName(res.name)
              setIsUserEmail(res.email)
              history.push('/movies');
            }
          })
          .catch((err) => console.log(`${err}`))
      }
    }
    tokenCheck()
  }, [history, loggedIn])

  const handleOnRegister = ({ name, email, password }) => {
    auth.register({ name, email, password })
      .then((res) => {
        console.log(res)
        if (res) {
          // setIsAuth(true);
          setLoggedIn(true);
          history.push('/movies');
        } else {
          // setIsError(true);
        }
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
        setIsUserName(res.name);
        setIsUserEmail(res.email);
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

  // useEffect(() => {
  //   if (loggedIn === true) {
  //     mainApi.getInfo()
  //       .then((res) => {
  //         setCurrentUser(res);
  //       })
  //       .catch((err) => console.log(`${err}`))
  //   }

  // }, [loggedIn])

  function handleInputChange(e) {
    setQuery(e.target.value)
  }

  const [filtredMovieArray, setFiltredMovieArray] = useState([]);
  const [isThumblerActive, setIsThumblerActive] = useState(false);

  const toggleThumbler = () => {
    setIsThumblerActive(!isThumblerActive)
  }

  // const searchKey = ["nameRU"]

  const filteredMovies = movies.filter((items) =>
    // searchKey.some((key) => items[key].toLowerCase().includes(query.toLowerCase()))
    items.nameRU.toLowerCase().includes(query.toLowerCase())
  )

  const handleMovieSearch = () => {
    localStorage.setItem('query', `${query}`);
    localStorage.setItem('movies', JSON.stringify(filteredMovies));
    localStorage.setItem('thumbler', isThumblerActive);
    setFiltredMovieArray(filteredMovies)
  }

  const localMovie = localStorage.getItem('movies');
  const localQuery = localStorage.getItem('query');
  const localThumbler = JSON.parse(localStorage.getItem('thumbler'));

  // dictionary

  const [dic, setDic] = useState({});

  const onMovieSave = (data) => {
    mainApi.setUserMovies(data)
      .then((res) => {
        setSavedMoviesList([res, ...savedMoviesList])
      })
  }

  useEffect(() => {
    setSavedMoviesIds(savedMoviesList.map((film) => film.movieId))
    console.log(savedMoviesList.map((film) => film.movieId))
  }, [savedMoviesList])

  const onMovieDelete = (_id) => {
    mainApi.deleteMovie(_id)
      .then(() => {
        setSavedMoviesList(savedMoviesList.filter((movie) => {
          return movie._id !== _id
        }))

      })
      .catch((err) => console.log(`${err}`))
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

        <Route exact path="/signin">
          <Login onLogin={handleOnLogin} isError={isError} errorMessage={errorMessage} />
        </Route>

        <Route exact path="/signup">
          <Register onRegister={handleOnRegister} isError={isError} errorMessage={errorMessage} />
        </Route>

        <ProtectedRoute exact path="/movies" component={Movies} loggedIn={loggedIn} onSearch={handleMovieSearch} onChange={handleInputChange} query={query} isThumblerActive={isThumblerActive} toggleThumbler={toggleThumbler} isLoading={isLoading} moviesList={filtredMovieArray} moviesNotFind={moviesNotFind} onMovieSave={onMovieSave} onMovieDelete={onMovieDelete} savedMoviesIds={savedMoviesIds} />

        <Route exact path="/saved-movies">
          <SavedMovies newMoviesList={savedMoviesList} onMovieDelete={onMovieDelete} />
        </Route>

        <ProtectedRoute exact path="/profile" component={Profile} loggedIn={loggedIn} isUserName={isUserName} isUserEmail={isUserEmail} onEdit={handleEditProfile} signOut={signOut} isError={isError} errorMessage={errorMessage} />

        <Route exact path="*">
          {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/signup" />}
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
