import React, { useState, useEffect } from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../../components/Preloader/Preloader';

const Movies = ({ moviesList, moviesNotFind, onMovieSave, onSearch, onChange, query, isThumblerActive, toggleThumbler, savedMoviesIds, deleteMovie, handleShortMovies, isLoading }) => {

  function debounce(fn, ms) {
    let timer
    return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    };
  }

  const [screenWidth, setDimensions] = useState(window.screen.availWidth)

  const [defaultCard, setDefaultCard] = useState(0);
  const movieCards = moviesList.slice(0, defaultCard);

  const showDefaultMovieList = () => {
    if (screenWidth > 768) {
      return setDefaultCard(12)
    }
    if (screenWidth <= 768 && screenWidth > 480) {
      return setDefaultCard(8)
    }
    if (screenWidth <= 480) {
      return setDefaultCard(5)
    }
  }

  const debouncedHandleResize = debounce(function handleResize() {
    setDimensions(window.screen.availWidth)
  }, 1000)

  useEffect(() => {
    showDefaultMovieList()

    window.removeEventListener('resize', debouncedHandleResize)
  }, [screenWidth])

  useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize)
  }, [screenWidth])

  const showMore = () => {
    if (screenWidth > 768) {
      return setDefaultCard(defaultCard + 3)
    }
    if (screenWidth <= 768) {
      return setDefaultCard(defaultCard + 2)
    }
  }

  const hideButton = () => {
    if (movieCards.length === moviesList.length) {
      return true
    } else {
      return false
    }
  }

  return (
    <>

      <SearchForm onSearch={onSearch} onChange={onChange} query={query} isThumblerActive={isThumblerActive} toggleThumbler={toggleThumbler} handleShortMovies={handleShortMovies} />

      {isLoading && <Preloader />}

      {moviesNotFind ? <span className="movies__not-found-text">Ничего не найдено</span> :
        (!isLoading && <MoviesCardList onClickBtn={showMore} isVisible={hideButton()}>

          {movieCards.map((movie) => (

            <MoviesCard key={movie.movieId} movie={movie} onMovieSave={onMovieSave} deleteMovie={deleteMovie} isLiked={savedMoviesIds.includes(movie.id)} />

          ))}

        </MoviesCardList>)}
    </>
  );
}

export default Movies;
