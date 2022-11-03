import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
// import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="Логотип" className="header__logo"/>
      <div className="header__menu">
        <a href="#" className="header__link header__link_type_signup">Регистрация</a>
        <a href="#" className="header__link header__link_type_signin">Войти</a>
      </div>
    </div>
  );
}

export default Header;
