import React, { useState, useEffect } from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import HeaderMain from '../HeaderMain/HeaderMain';
import SearchForm from '../SearchForm/SearchForm';
// import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const Movies = ({ moviesList, moviesNotFind, onMovieSave, onSearch, onChange, query, isThumblerActive, toggleThumbler }) => {

  // const userContent = React.useContext(CurrentUserContext);

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

  useEffect(() => {
    showDefaultMovieList()
  }, [screenWidth])

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions(window.screen.availWidth)
    }, 1000)
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
      <Header headerClassName="header header-main header_type_movies">
        <HeaderMain />
      </Header>

      <SearchForm onSearch={onSearch} onChange={onChange} query={query} isThumblerActive={isThumblerActive} toggleThumbler={toggleThumbler} />

      {moviesNotFind ? <span className="movies__not-found-text">Ничего не найдено</span> :
        <MoviesCardList onClickBtn={showMore} isVisible={hideButton()}>

          {movieCards.map((movie) => (

            <MoviesCard key={movie._id} movie={movie} onMovieSave={onMovieSave} />

          ))}

        </MoviesCardList>}

      <Footer />
    </>
  );
}

export default Movies;
