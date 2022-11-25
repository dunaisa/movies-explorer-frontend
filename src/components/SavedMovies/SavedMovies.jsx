import React from 'react';
import { NavLink } from 'react-router-dom';
import './SavedMovies.css';
import Header from '../Header/Header';
import profileIcon from '../../images/profile-icon.svg';
import SearchForm from '../SearchForm/SearchForm';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Footer from '../Footer/Footer';

const SavedMovies = ({ newMoviesList }) => {

  const [menuActive, setMenuActive] = React.useState(false);
  const [crossBtn, setCrossBtn] = React.useState(false);

  const [deleteBtnShown, setDeleteBtnShown] = React.useState(false);

  const handleAddDeleteBtn = () => {
    setDeleteBtnShown(true)
  }

  const handleRemoveDeleteBtn = () => {
    setDeleteBtnShown(false)
  }

  return (
    <>
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

      <SearchForm />

      <MoviesCardList>
        <MoviesCard>
          {newMoviesList.map((movie) => (

            <MoviesCard key={movie.id} movie={movie} />

          ))}
        </MoviesCard>

      </MoviesCardList>

      <Footer />

    </>
  );
}

export default SavedMovies;
