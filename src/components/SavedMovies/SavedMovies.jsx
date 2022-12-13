import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

const SavedMovies = ({ newMoviesList, onMovieDelete, handleShortMovies, isMainPage, onSavedInputChange, handleCheckBoxChange, isServerError }) => {

  return (
    <>

      <SearchForm handleShortMovies={handleShortMovies} isMainPage={isMainPage} onSavedInputChange={onSavedInputChange} handleCheckBoxChange={handleCheckBoxChange} />

      {
        <MoviesCardList>
          {newMoviesList.map((movieSave) => (

            <MoviesCard key={movieSave._id} movie={movieSave} onMovieDelete={onMovieDelete} isMainPage={isMainPage} />

          ))}

          {
            isServerError && <span className="movies__not-found-text">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</span>
          }

          {/* {
            !isServerError && !newMoviesList && <span className="movies__not-found-text"></span>
          } */}

          {
            !isServerError && newMoviesList.length === 0 && <span className="movies__not-found-text">Ничего не найдено</span>
          }

        </MoviesCardList>}

    </>
  );
}

export default React.memo(SavedMovies);
