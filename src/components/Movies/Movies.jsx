import React, { useState, useEffect } from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';

const Movies = ({ moviesList, onMovieSave, handleInputChange, handleThumblerChange, savedMoviesIds, deleteMovie, isLoading, setIsloading, isMainPage = { isMainPage } }) => {

  const [firstLoad, setFirstLoad] = useState(true);

  const handleFirstPageLoad = (state) => {
    setFirstLoad(state)
  }
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
    if (screenWidth > 768) {
      return setDefaultCard(12)
    }
    if (screenWidth <= 768 && screenWidth > 480) {
      return setDefaultCard(8)
    }
    if (screenWidth <= 480) {
      return setDefaultCard(5)
    }
  }, [screenWidth])

  useEffect(() => {

    if (screenWidth > 790) {
      setSlicedArray(moviesList.slice(0, defaultCard));
    } else if (screenWidth <= 790 && screenWidth > 450) {
      setSlicedArray(moviesList.slice(0, defaultCard));
    } else if (screenWidth <= 450) {
      setSlicedArray(moviesList.slice(0, defaultCard));
    }

  }, [moviesList, defaultCard, screenWidth])

  const showMore = () => {
    if (screenWidth > 790) {
      setSlicedArray(moviesList.slice(0, slicedArray.length + 8))
    } else if (screenWidth <= 790 && screenWidth > 450) {
      setSlicedArray(moviesList.slice(0, slicedArray.length + 3))
    } else if (screenWidth <= 450) {
      setSlicedArray(moviesList.slice(0, slicedArray.length + 2))
    }
  }

  const hideButton = () => {
    if (slicedArray) {
      if (slicedArray.length === moviesList.length) {

        return true
      } else {
        return false
      }
    }
  }

  return (
    <>

      <SearchForm handleInputChange={handleInputChange} handleThumblerChange={handleThumblerChange} handleFirstPageLoad={handleFirstPageLoad} setIsloading={setIsloading} isMainPage={isMainPage} />


      {<MoviesCardList isLoading={isLoading} onClickBtn={showMore} isVisible={hideButton()}>

        {moviesList.length > 0 && slicedArray.map((movie) => (

          <MoviesCard key={movie.movieId} movie={movie} onMovieSave={onMovieSave} deleteMovie={deleteMovie} isLiked={savedMoviesIds.includes(movie.id)} />

        ))}

        {
          firstLoad && moviesList === null && <span className="movies__not-found-text"></span>
        }

        {
          !firstLoad && moviesList.length === 0 && <span className="movies__not-found-text">Ничего не найдено</span>
        }

      </MoviesCardList>}
    </>
  );
}

export default React.memo(Movies);
