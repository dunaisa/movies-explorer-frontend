import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, NavLink, useHistory } from 'react-router-dom';
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
import profileIcon from '../../images/profile-icon.svg';
import SearchForm from '../SearchForm/SearchForm';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Preloader from '../Preloader/Preloader';

function App() {

  const [isCurrentUser, setCurrentUser] = useState({});

  const [menuActive, setMenuActive] = useState(false);
  const [crossBtn, setCrossBtn] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const [savedMoviesList, setSavedMoviesList] = useState([]);

  const [query, setQuery] = useState('');

  const history = useHistory();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // const [loggedIn, setLoggedIn] = useState(false);


  // const [isAuth, setIsAuth] = useState(false);
  // const [isError, setIsError] = useState(false);

  const handleOnRegister = ({ name, email, password }) => {
    auth.register({ name, email, password })
      .then((res) => {
        console.log(res)
        if (res) {
          // setIsAuth(true);
          // setLoggedIn(true);
          history.push('/movies');
        } else {
          // setIsError(true);
        }
      })
      // .catch(() => { setIsError(true) })
      .catch((err) => {
        setErrorMessage((`${err}`))
        setIsError(true)
      })
  }

  function handleOnLogin({ email, password }) {
    auth.authorize({ email, password })
      .then(() => {
        history.push('/movies');

      })
      .catch((err) => {
        setErrorMessage((`${err}`))
        setIsError(true)
      })
  }

  const [movies, setMovies] = useState([]);
  const [moviesNotFind, setMoviesNotFind] = useState(false);

  useEffect(() => {

    // if (movies.length === 0 && query.length > 0) {
    //   console.log(movies.length)
    //   console.log(movies.length === 0 && query.length > 0)
    //   setMoviesNotFind(true)
    // }

    moviesApi.getMovies()
      .then((res) => {
        setIsloading(true);
        setMovies(res);
        // localStorage.setItem('movies', JSON.stringify(res));
      })
      .catch((err) => console.log(`${err}`))
      .finally(() => {
        setIsloading(false)
      })


  }, [])

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

  const onMovieSave = (data) => {
    mainApi.setInitialCards(data)
      .then((res) => {
        console.log(res)
        setSavedMoviesList([...res])
      })
  }

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
          <PageNotFound />
        </Route>

        <Route exact path="/signin">
          <Login onLogin={handleOnLogin} isError={isError} errorMessage={errorMessage} />
        </Route>

        <Route exact path="/signup">
          <Register onRegister={handleOnRegister} isError={isError} errorMessage={errorMessage} />
        </Route>

        <Route exact path="/movies">
          <Header headerClassName="header header-main header_type_movies">
            <ul className="header-main__items">
              <li className="header-main__item">
                <NavLink className="header-main__link header-main__link_type_movies" activeClassName="header-main__link_type_active" to="/movies">Фильмы</NavLink>
              </li>

              <li className="header-main__item">
                <NavLink className="header-main__link header-main__link_type_movies" activeClassName="header-main__link_type_active" to="/saved-movies">Сохранённые фильмы</NavLink>
              </li>

              <li className="header-main__item header-main__item_type_profile">
                <NavLink className="header-main__link header-main__link_type_profile" to="/profile">Аккаунт</NavLink>
                <img src={profileIcon} alt="" className="header-main__link_type_icon-profile" />
              </li>

            </ul>

            <BurgerMenu active={menuActive} />

            <div
              className='header-main__burger-btn'
              onClick={() => {
                setMenuActive(!menuActive)
                setCrossBtn(!crossBtn)
              }}>
              <span
                className={` ${crossBtn ? 'header-main__burger-span_active' : 'header-main__burger-span'}`}
              ></span>
            </div>

          </Header>
          <SearchForm onSearch={handleMovieSearch} onChange={handleInputChange} query={query} isThumblerActive={isThumblerActive} toggleThumbler={toggleThumbler} />
          {isLoading ? <Preloader /> : <Movies moviesList={filtredMovieArray} moviesNotFind={moviesNotFind} onMovieSave={onMovieSave} />}
        </Route>

        <Route exact path="/saved-movies">
          <SavedMovies newMoviesList={savedMoviesList} />
        </Route>

        <Route exact path="/profile">
          <Profile />
        </Route>



      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
