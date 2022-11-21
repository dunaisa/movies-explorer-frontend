import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, NavLink, useHistory } from 'react-router-dom';
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
import profileIcon from '../../images/profile-icon.svg';
import SearchForm from '../SearchForm/SearchForm';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function App() {


  const [menuActive, setMenuActive] = useState(false);
  const [crossBtn, setCrossBtn] = useState(false);

  const history = useHistory();

  const handleOnRegister = ({ name, email, password }) => {
    if ({ name, email, password }) {
      history.push('/signin');
    }
  }

  const handleOnLogin = ({ name, email, password }) => {
    if ({ name, email, password }) {
      history.push('/movies');
    }
  }


  const [movies, setMovies] = useState([]);

  useEffect(() => {
    moviesApi.getMovies()
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => console.log(`${err}`))
  }, [])

  const [query, setQuery] = useState('');

  function handleInputChange(e) {
    setQuery(e.target.value)
  }

  const [filtredMovieArray, seFiltredMovieArray] = useState([]);
  const [isThumblerActive, setIsThumblerActive] = useState(false);

  // const searchKey = ["nameRU"]

  const filteredMovies = movies.filter((items) =>
    // searchKey.some((key) => items[key].toLowerCase().includes(query.toLowerCase()))
    items.nameRU.toLowerCase().includes(query.toLowerCase())
  )

  const handleMovieSearch = () => {
    localStorage.setItem('query', `${query}`);
    localStorage.setItem('movie', JSON.stringify(filteredMovies));
    localStorage.setItem('thumbler', false);
    seFiltredMovieArray(filteredMovies)
  }

  useEffect(() => {
    const localMovie = localStorage.getItem('movie');
    const localQuery = localStorage.getItem('query');
    const localThumbler = localStorage.getItem('thumbler');
    console.log(localQuery)
    if (localMovie) {
      setQuery(localQuery)
      seFiltredMovieArray(JSON.parse(localMovie))
      setIsThumblerActive(localThumbler)
    }
  }, [])

  return (
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
        <Login onLogin={handleOnLogin} />
      </Route>

      <Route exact path="/signup">
        <Register onRegister={handleOnRegister} />
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
        <SearchForm onSearch={handleMovieSearch} onChange={handleInputChange} query={query} isThumblerActive={isThumblerActive} />
        <Movies moviesList={filtredMovieArray} />
      </Route>

      <Route exact path="/saved-movies">
        <SavedMovies />
      </Route>

      <Route exact path="/profile">
        <Profile />
      </Route>

    </Switch>
  );
}

export default App;
