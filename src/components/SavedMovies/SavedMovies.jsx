import React from 'react';
import { NavLink } from 'react-router-dom';
import './SavedMovies.css';
import Header from '../Header/Header';
import profileIcon from '../../images/profile-icon.svg';
import SearchForm from '../SearchForm/SearchForm';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import movieImage from '../../images/movie-image/movie-image.jpg';
import yearsOfDesign from '../../images/movie-image/movie-image-100-years.jpg';
import movieBasciya from '../../images/movie-image/basciyapic.jpg';
import Footer from '../Footer/Footer';

const SavedMovies = () => {

  const [menuActive, setMenuActive] = React.useState(false);
  const [crossBtn, setCrossBtn] = React.useState(false);

  const [deleteBtnShown, setDeleteBtnShown] = React.useState(false);

  const handleAddDeleteBtn = () => {
    setDeleteBtnShown(true)
  }

  const handleRemoveDeleteBtn = () => {
    setDeleteBtnShown(false)
  }

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
        <MoviesCard
          imageSrc={movieImage}
          movieTitle="33 слова о дизайне"
          movieDuration="1ч 47м"
          onMouseEnter={handleAddDeleteBtn}
          onMouseLeave={handleRemoveDeleteBtn}>
          {deleteBtnShown && (<button className="movie__delete-btn"></button>)}
        </MoviesCard>

        <MoviesCard
          imageSrc={yearsOfDesign}
          movieTitle="Киноальманах «100 лет дизайна»"
          movieDuration="1ч 47м"
          onMouseEnter={handleAddDeleteBtn}
          onMouseLeave={handleRemoveDeleteBtn}>
          {deleteBtnShown && (<button className="movie__delete-btn"></button>)}

        </MoviesCard>

        <MoviesCard
          imageSrc={movieBasciya}
          movieTitle="Баския: Взрыв реальности"
          movieDuration="1ч 47м"
          onMouseEnter={handleAddDeleteBtn}
          onMouseLeave={handleRemoveDeleteBtn}>
          {deleteBtnShown && (<button className="movie__delete-btn"></button>)}
        </MoviesCard>

      </MoviesCardList>

      <Footer />

    </>
  );
}

export default SavedMovies;
