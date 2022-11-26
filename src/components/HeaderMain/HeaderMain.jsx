import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './HeaderMain.css';

import profileIcon from '../../images/profile-icon.svg';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const HeaderMain = () => {

  const [menuActive, setMenuActive] = useState(false);
  const [crossBtn, setCrossBtn] = useState(false);

  return (
    <>
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
    </>
  );
}

export default HeaderMain;
