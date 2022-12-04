import React from 'react';
import { NavLink } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import profileIcon from '../../images/profile-icon.svg';
import EditProfileForm from '../EditProfileForm/EditProfileForm';


const Profile = ({ onEdit, signOut, isError, errorMessage }) => {

  // const [menuActive, setMenuActive] = React.useState(false);
  // const [crossBtn, setCrossBtn] = React.useState(false);

  return (
    <>
      {/* <Header headerClassName="header header-main header_type_movies">
        <ul className="header-main__items">
          <li className="header-main__item">
            <NavLink className="header-main__link header-main__link_type_movies" activeClassName="" to="/movies">Фильмы</NavLink>
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

      </Header> */}

      <EditProfileForm onEdit={onEdit} signOut={signOut} isError={isError} errorMessage={errorMessage} />

    </>
  );
}

export default Profile;
