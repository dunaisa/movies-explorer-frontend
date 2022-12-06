import React from 'react';
import { NavLink } from 'react-router-dom';
import './BurgerMenu.css';
import profileIcon from '../../images/profile-icon.svg';

const BurgerMenu = ({ active }) => {

  return (
    <div className={`header-burger-menu ${active ? "header-burger-menu_active" : ""}`}>

      <div className="header-burger-menu__container">
        <ul className="header-burger-menu__items">

          <li className="header-burger-menu__item header-burger-menu__item_type_movie">
            <NavLink className="header-burger-menu__link header-burger-menu__link_type_movies" activeClassName="header-burger-menu__link_active" exact to="/">Главная</NavLink>
          </li>

          <li className="header-burger-menu__item header-burger-menu__item_type_movie">
            <NavLink className="header-burger-menu__link header-burger-menu__link_type_movies" activeClassName="header-burger-menu__link_active" to="/movies">Фильмы</NavLink>
          </li>

          <li className="header-burger-menu__item header-burger-menu__item_type_movie">
            <NavLink className="header-burger-menu__link header-burger-menu__link_type_movies" activeClassName="header-burger-menu__link_active" to="/saved-movies">Сохранённые фильмы</NavLink>
          </li>

          <li className="header-burger-menu__item header-burger-menu__item_type_profile">
            <NavLink className="header-burger-menu__link header-burger-menu__link_type_profile" to="/profile">Аккаунт</NavLink>
            <img src={profileIcon} alt="Иконка ссылки на профиль" className="header-burger-menu__link header-burger-menu__link_type_icon-profile" />
          </li>

        </ul>
      </div>
    </div>
  );
}

export default BurgerMenu;
