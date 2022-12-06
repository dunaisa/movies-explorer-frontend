import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import '../HeaderMain/HeaderMain.css';
import logo from '../../images/logo.svg';

import profileIcon from '../../images/profile-icon.svg';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const Header = ({ loggedIn }) => {

  const [menuActive, setMenuActive] = useState(false);
  const [crossBtn, setCrossBtn] = useState(false);

  const handleBurgerMenuOpen = () => {
    setMenuActive(!menuActive)
    setCrossBtn(!crossBtn)
  }

  return (

    <header className={`header ${loggedIn ? 'header-main' : 'header_type_intro'}`}>
      <a href="/" className="header__link-logo">
        <img src={logo} alt="Логотип" className="header__logo" />
      </a>
      <nav className="header__menu">
        {!loggedIn ?
          <ul className="header__items">
            <li className="header__item">
              <Link className="header__link header__link_type_signup" to="/signup">Регистрация</Link>
            </li>

            <li className="header__item">
              <Link className="header__link header__link_type_signin" to="/signin">Войти</Link>
            </li>
          </ul> : <><ul className="header-main__items">
            <li className="header-main__item">
              <NavLink className="header-main__link header-main__link_type_movies" activeClassName="header-main__link_type_active" to="/movies">Фильмы</NavLink>
            </li>

            <li className="header-main__item">
              <NavLink className="header-main__link header-main__link_type_movies" activeClassName="header-main__link_type_active" to="/saved-movies">Сохранённые фильмы</NavLink>
            </li>

            <li className="header-main__item header-main__item_type_profile">
              <NavLink className="header-main__link header-main__link_type_profile" to="/profile">Аккаунт</NavLink>
              <img src={profileIcon} alt="Иконка кнопки профиля" className="header-main__link_type_icon-profile" />
            </li>

          </ul>

            <BurgerMenu active={menuActive} />

            <div
              className='header-main__burger-btn'
              onClick={handleBurgerMenuOpen}>
              <span
                className={` ${crossBtn ? 'header-main__burger-span_active' : 'header-main__burger-span'}`}
              ></span>
            </div></>}

      </nav>

    </header>
  );
}

export default Header;
