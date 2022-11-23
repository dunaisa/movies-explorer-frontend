import React, { useState, useEffect } from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Footer from '../Footer/Footer';
// import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const Movies = ({ moviesList }) => {

  // const userContent = React.useContext(CurrentUserContext);

  // const [arr, setArr] = useState([]);

  // useEffect(() => {
  //   setArr(moviesList)
  // }, [moviesList])

  return (
    <>

      <MoviesCardList>

        {moviesList.map((movie) => (

          <MoviesCard key={movie.id} movie={movie} />

        ))}

      </MoviesCardList>

      {/* <MoviesCardList>
        <span
          className={`movies__not-found-text ${moviesNotFind ? "movies__not-found-text_type_visible" : ""}`}>Ничего не найдено</span>

        {moviesList.map((movie) => (

          <MoviesCard key={movie.id} movie={movie} />

        ))}

      </MoviesCardList> */}

      <Footer />
    </>
  );
}

export default Movies;
