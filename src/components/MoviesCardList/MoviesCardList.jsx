import React from 'react';
import './MoviesCardList.css';


const MoviesCardList = ({ children }) => {
  return (
    <section className="movies">
      <ul className="movies__container">
        {children}
      </ul>

      {/* <button className="movies__btn">Еще</button> */}
    </section>
  );
}

export default MoviesCardList;
