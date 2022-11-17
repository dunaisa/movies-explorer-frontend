import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';

const Header = ({ children, headerClassName }) => {

  return (
    <div className={headerClassName}>
      <a href="/" className="header__link-logo">
        <img src={logo} alt="Логотип" className="header__logo" />
      </a>
      <nav className="header__menu">
        {children}
      </nav>

    </div>
  );
}

export default Header;
