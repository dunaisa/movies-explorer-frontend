import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

const SavedMovies = ({ newMoviesList, onMovieDelete, isChecked, toggleThumbler, handleShortMovies, onSearch, onChange, query }) => {

  return (
    <>

      <SearchForm isThumblerActive={isChecked} toggleThumbler={toggleThumbler} handleShortMovies={handleShortMovies} onSearch={onSearch} onChange={onChange} query={query} />

      <MoviesCardList>
        {newMoviesList.map((movieSave) => (

          <MoviesCard key={movieSave._id} movie={movieSave} onMovieDelete={onMovieDelete} />

        ))}

      </MoviesCardList>

    </>
  );
}

export default SavedMovies;
