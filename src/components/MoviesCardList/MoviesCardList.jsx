import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import Preloader from '../../components/Preloader/Preloader';

const MoviesCardList = ({ children, onClickBtn, isVisible, isLoading, moviesList, showMore, slicedArray, isFirstLoad, localValue }) => {

  const location = useLocation();

  return (
    <section className="movies">
      {isLoading && <Preloader />}

      {!isLoading && <ul className="movies__container">
        {children}
      </ul>}


      {(location.pathname === "/movies" && !!moviesList && !isLoading && !!localValue) ? <button className={`movies__btn ${((moviesList.length > slicedArray.length)) ? '' : 'movies__btn_type_hidden'}`} onClick={showMore} >Еще</button> : ''}

    </section>
  );
}

export default React.memo(MoviesCardList);
