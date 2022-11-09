import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Header/Header';
import './Movies.css';
import profileIcon from '../../images/profile-icon.svg';
import SearchForm from '../SearchForm/SearchForm';

const Movies = () => {
  return (
    <>
      <Header headerClassName="header header_type_movies">
        <ul className="header__items">
          <li className="header__item">
            <NavLink className="header__link header__link_type_movies" activeClassName="header__link_active" to="/mpvies">Фильмы</NavLink>
          </li>

          <li className="header__item">
            <NavLink className="header__link header__link_type_movies" activeClassName="header__link_active" to="/saved-movies">Сохранённые фильмы</NavLink>
          </li>

          <li className="header__item header__item_type_profile">
            <NavLink className="header__link header__link_type_profile" activeClassName="header__link_active" to="/profile">Аккаунт</NavLink>
            <img src={profileIcon} alt="Иконка ссылки на профиль" className="header__link header__link_type_icon-profile" />
          </li>

        </ul>
      </Header>

      <SearchForm />
    </>
  );
}

export default Movies;
