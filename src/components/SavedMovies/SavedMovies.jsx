import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

const SavedMovies = ({ newMoviesList, onMovieDelete, handleShortMovies, isMainPage, onSavedInputChange, handleCheckBoxChange }) => {

  return (
    <>

      <SearchForm handleShortMovies={handleShortMovies} isMainPage={isMainPage} onSavedInputChange={onSavedInputChange} handleCheckBoxChange={handleCheckBoxChange} />

      {
        <MoviesCardList>
          {newMoviesList.map((movieSave) => (

            <MoviesCard key={movieSave._id} movie={movieSave} onMovieDelete={onMovieDelete} />

          ))}

        </MoviesCardList>}

    </>
  );
}

export default SavedMovies;
