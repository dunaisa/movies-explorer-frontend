import React, { useState, useEffect } from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';

const Movies = ({ moviesList, onMovieSave, handleInputChange, handleThumblerChange, savedMoviesIds, deleteMovie, isLoading, setIsloading, isMainPage, localValue, localThumblerState, isServerError, handleFirstPageLoading }) => {

  const [screenWidth, setScreenWidth] = useState(window.screen.availWidth)

  const [defaultCard, setDefaultCard] = useState(0);

  const [slicedArray, setSlicedArray] = useState([]);

  const handleChangeScreen = () => {
    setScreenWidth(window.screen.width)
  }

  useEffect(() => {
    window.addEventListener("resize", handleChangeScreen);
    return () => {
      window.removeEventListener("resize", handleChangeScreen);
    }
  }, [])

  useEffect(() => {
    if (screenWidth >= 1280) {
      return setDefaultCard(12)
    }
    if (screenWidth < 1280 && screenWidth >= 768) {
      return setDefaultCard(8)
    }
    if (screenWidth < 768) {
      return setDefaultCard(5)
    }
  }, [screenWidth])

  useEffect(() => {
    if (moviesList !== null) {
      if (screenWidth > 790) {
        setSlicedArray(moviesList.slice(0, defaultCard));
      } else if (screenWidth <= 790 && screenWidth > 450) {
        setSlicedArray(moviesList.slice(0, defaultCard));
      } else if (screenWidth <= 450) {
        setSlicedArray(moviesList.slice(0, defaultCard));
      }
    }


  }, [moviesList, defaultCard, screenWidth])

  const showMore = () => {
    if (screenWidth >= 1280) {
      setSlicedArray(moviesList.slice(0, slicedArray.length + 3))
    } else if (screenWidth < 1280 && screenWidth >= 768) {
      setSlicedArray(moviesList.slice(0, slicedArray.length + 2))
    } else if (screenWidth < 768) {
      setSlicedArray(moviesList.slice(0, slicedArray.length + 2))
    }
  }

  return (
    <>
      <SearchForm handleInputChange={handleInputChange} handleThumblerChange={handleThumblerChange} setIsloading={setIsloading} isMainPage={isMainPage} localValue={localValue} localThumblerState={localThumblerState} handleFirstPageLoading={handleFirstPageLoading} />

      {<MoviesCardList isLoading={isLoading} onClickBtn={showMore} isVisible={moviesList !== null && moviesList.length > slicedArray.length && !isLoading}>

        {!isServerError && localValue !== null && (moviesList.length > 0) && !isLoading && (slicedArray.map((movie) => (

          <MoviesCard key={movie.id} movie={movie} onMovieSave={onMovieSave} deleteMovie={deleteMovie} isLiked={savedMoviesIds.includes(movie.id)} />

        )))}

        {
          !isServerError && !localValue && !isLoading && <span className="movies__not-found-text"></span>
        }
        {
          !isServerError && localValue && (moviesList.length === 0) && !isLoading && <span className="movies__not-found-text">Ничего не найдено</span>
        }
        {
          isServerError && <span className="movies__not-found-text">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</span>
        }

      </MoviesCardList>}
    </>
  );
}

export default React.memo(Movies);
