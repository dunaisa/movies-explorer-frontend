import React from 'react';
import './MoviesCardList.css';


const MoviesCardList = ({ children, onClickBtn, isVisible }) => {


  return (
    <section className="movies">
      <ul className="movies__container">
        {children}
      </ul>

      <button className={`movies__btn ${isVisible ? 'movies__btn_type_hidden' : ''}`} onClick={onClickBtn}>Еще</button>
    </section>
  );
}

export default MoviesCardList;
