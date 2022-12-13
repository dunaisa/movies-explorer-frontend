import React, { useState, useEffect, useCallback } from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import { LARGE_WINDOW_DISPLAY, MIDDLE_WiNDOW_DISPLAY, MIDDLE_WINDOW_SCREEN, SMALL_WiNDOW_SCREEN, MORE_BUTTON_LARGE, DEFAULT_FILMS_NUMBER_LARGE, MORE_BUTTON_MIDDLE, DEFAULT_FILMS_NUMBER_MIDDLE, DEFAULT_FILMS_NUMBER_SMALL } from '../../constants/constants';

const Movies = ({ moviesList, onMovieSave, handleInputChange, handleThumblerChange, savedMoviesIds, onMovieDelete, isLoading, setIsloading, isMainPage, localValue, localThumblerState, isServerError }) => {

  const [screenWidth, setScreenWidth] = useState(window.screen.width)

  const [defaultCard, setDefaultCard] = useState(0);

  const [slicedArray, setSlicedArray] = useState([]);

  const [isFirstLoad, setIsFirstLoad] = useState(false);

  const handleFirstPageLoading = useCallback((state) => {
    setIsFirstLoad(state)
  }, [])

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
    if (screenWidth >= LARGE_WINDOW_DISPLAY) {
      return setDefaultCard(DEFAULT_FILMS_NUMBER_LARGE)
    }
    if (screenWidth < LARGE_WINDOW_DISPLAY && screenWidth >= MIDDLE_WiNDOW_DISPLAY) {
      return setDefaultCard(DEFAULT_FILMS_NUMBER_MIDDLE)
    }
    if (screenWidth < MIDDLE_WiNDOW_DISPLAY) {
      return setDefaultCard(DEFAULT_FILMS_NUMBER_SMALL)
    }
  }, [screenWidth])

  useEffect(() => {
    if (!!moviesList) {
      if (screenWidth > MIDDLE_WINDOW_SCREEN) {
        setSlicedArray(moviesList.slice(0, defaultCard));
      } else if (screenWidth <= MIDDLE_WINDOW_SCREEN && screenWidth > SMALL_WiNDOW_SCREEN) {
        setSlicedArray(moviesList.slice(0, defaultCard));
      } else if (screenWidth <= SMALL_WiNDOW_SCREEN) {
        setSlicedArray(moviesList.slice(0, defaultCard));
      }
    }

  }, [moviesList, defaultCard, screenWidth])

  const showMore = () => {
    if (!!moviesList) {
      if (screenWidth >= LARGE_WINDOW_DISPLAY) {
        setSlicedArray(moviesList.slice(0, slicedArray.length + MORE_BUTTON_LARGE))
      } else if (screenWidth < LARGE_WINDOW_DISPLAY && screenWidth >= MIDDLE_WiNDOW_DISPLAY) {
        setSlicedArray(moviesList.slice(0, slicedArray.length + MORE_BUTTON_MIDDLE))
      } else if (screenWidth < MIDDLE_WiNDOW_DISPLAY) {
        setSlicedArray(moviesList.slice(0, slicedArray.length + MORE_BUTTON_MIDDLE))
      }
    }
  }

  return (
    <>
      <SearchForm handleInputChange={handleInputChange} handleThumblerChange={handleThumblerChange} setIsloading={setIsloading} isMainPage={isMainPage} localValue={localValue} localThumblerState={localThumblerState} handleFirstPageLoading={handleFirstPageLoading} />

      {<MoviesCardList moviesList={moviesList} isLoading={isLoading} showMore={showMore} slicedArray={slicedArray} isFirstLoad={isFirstLoad} localValue={localValue}>

        {!isServerError && !!localValue && !isLoading && !!moviesList && !isFirstLoad ? (slicedArray.map((movie) => (

          <MoviesCard key={movie.id} movie={movie} onMovieSave={onMovieSave} onMovieDelete={onMovieDelete} isLiked={savedMoviesIds.includes(movie.id)} isMainPage={isMainPage} />

        ))) : <span className="movies__not-found-text"></span>}

        {/* {
          !isServerError && !localValue && !isLoading && !moviesList && <span className="movies__not-found-text"></span>
        } */}
        {
          !isServerError && !!localValue && !!moviesList && moviesList.length === 0 && !isLoading && <span className="movies__not-found-text">Ничего не найдено</span>
        }
        {
          isServerError && !isFirstLoad && <span className="movies__not-found-text">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</span>
        }

      </MoviesCardList>}
    </>
  );
}

export default React.memo(Movies);
