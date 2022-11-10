import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Header/Header';
import './Movies.css';
import profileIcon from '../../images/profile-icon.svg';
import SearchForm from '../SearchForm/SearchForm';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const Movies = () => {

  const [menuActive, setMenuActive] = React.useState(false);
  const [crossBtn, setCrossBtn] = React.useState(false);

  return (
    <>
      <Header headerClassName="header header-main header_type_movies">
        <ul className="header-main__items">
          <li className="header-main__item">
            <NavLink className="header-main__link header-main__link_type_movies" activeClassName="" to="/mpvies">Фильмы</NavLink>
          </li>

          <li className="header-main__item">
            <NavLink className="header-main__link header-main__link_type_movies" activeClassName="" to="/saved-movies">Сохранённые фильмы</NavLink>
          </li>

          <li className="header-main__item header-main__item_type_profile">
            <NavLink className="header-main__link header-main__link_type_profile" activeClassName="" to="/profile">Аккаунт</NavLink>
            <img src={profileIcon} alt="" className="header-main__link_type_icon-profile" />
          </li>

        </ul>

        <BurgerMenu active={menuActive} />
        {/* <div className={` ${menuActive ? 'header-main__burger-btn_active' : 'header-main__burger-btn'}`} onClick={() => setMenuActive(!menuActive)}>
          <span></span>
        </div> */}

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
    </>
  );
}

export default Movies;
