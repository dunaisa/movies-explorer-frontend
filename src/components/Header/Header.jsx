import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
// import { Link } from 'react-router-dom';

const Header = ({ children }) => {
  return (
    <div className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <nav className="header__menu">
        {children}
      </nav>
    </div>
  );
}

export default Header;
