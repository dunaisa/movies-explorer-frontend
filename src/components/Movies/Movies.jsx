import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Header/Header';
import './Movies.css';
import profileIcon from '../../images/profile-icon.svg';
import SearchForm from '../SearchForm/SearchForm';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import movieImage from '../../images/movie-image/movie-image.jpg';
import movieBanksy from '../../images/movie-image/banksy.jpg';
import yearsOfDesign from '../../images/movie-image/movie-image-100-years.jpg';
import movieBasciya from '../../images/movie-image/basciyapic.jpg';
import runningIsFreedom from '../../images/movie-image/running-is-freedom.jpg';
import booksalers from '../../images/movie-image/book-salers.jpg';
import Germany from '../../images/movie-image/Germany.jpg';
import GimmeDanger from '../../images/movie-image/Gimme-Danger.jpg';
import Footer from '../Footer/Footer';

const Movies = () => {

  const [menuActive, setMenuActive] = React.useState(false);
  const [crossBtn, setCrossBtn] = React.useState(false);

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
        <MoviesCard imageSrc={movieImage} movieTitle="33 слова о дизайне" movieDuration="1ч 47м">
          <button className="movie__like-btn"></button>
        </MoviesCard>
        <MoviesCard imageSrc={yearsOfDesign} movieTitle="Киноальманах «100 лет дизайна»" movieDuration="1ч 47м">
          <button className="movie__like-btn"></button>
        </MoviesCard>
        <MoviesCard imageSrc={movieBanksy} movieTitle="В погоне за Бенкси" movieDuration="1ч 47м">
          <button className="movie__like-btn"></button>
        </MoviesCard>
        <MoviesCard imageSrc={movieBasciya} movieTitle="Баския: Взрыв реальности" movieDuration="1ч 47м">
          <button className="movie__like-btn"></button>
        </MoviesCard>
        <MoviesCard imageSrc={runningIsFreedom} movieTitle="Бег это свобода" movieDuration="1ч 47м">
          <button className="movie__like-btn"></button>
        </MoviesCard>
        <MoviesCard imageSrc={booksalers} movieTitle="Книготорговцы" movieDuration="1ч 47м">
          <button className="movie__like-btn"></button>
        </MoviesCard>
        <MoviesCard imageSrc={Germany} movieTitle="Когда я думаю о Германии ночью" movieDuration="1ч 47м">
          <button className="movie__like-btn"></button>
        </MoviesCard>
        <MoviesCard imageSrc={GimmeDanger} movieTitle="Gimme Danger: История Игги и The Stooges" movieDuration="1ч 47м">
          <button className="movie__like-btn"></button>
        </MoviesCard>
      </MoviesCardList>

      <Footer />
    </>
  );
}

export default Movies;
