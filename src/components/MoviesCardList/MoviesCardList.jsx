import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import Preloader from '../../components/Preloader/Preloader';

const MoviesCardList = ({ children, onClickBtn, isVisible, isLoading }) => {

  const location = useLocation();

  return (
    <section className="movies">
      {isLoading && <Preloader />}

      {!isLoading && <ul className="movies__container">
        {children}
      </ul>}

      {location.pathname === "/movies" ? <button className={`movies__btn ${isVisible ? 'movies__btn_type_hidden' : ''}`} onClick={onClickBtn}>Еще</button> : ''}


    </section>
  );
}

export default MoviesCardList;
