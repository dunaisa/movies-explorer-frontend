import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';


const MoviesCardList = ({ children, onClickBtn, isVisible }) => {

  const location = useLocation();

  return (
    <section className="movies">
      <ul className="movies__container">
        {children}
      </ul>

      {location.pathname === "/movies" ? <button className={`movies__btn ${isVisible ? 'movies__btn_type_hidden' : ''}`} onClick={onClickBtn}>Еще</button> : ''}


    </section>
  );
}

export default MoviesCardList;
