import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../../components/Preloader/Preloader';

const SavedMovies = ({ newMoviesList, onMovieDelete, isChecked, toggleThumbler, handleShortMovies, onSearch, onChange, query, isLoading, moviesNotFind }) => {

  // setValues, quertySavedMovies, handleSubmit

  return (
    <>

      <SearchForm isThumblerActive={isChecked} toggleThumbler={toggleThumbler} handleShortMovies={handleShortMovies} onSearch={onSearch} onChange={onChange} query={query} />

      {isLoading && <Preloader />}



      {moviesNotFind ? <span className="movies__not-found-text">Ничего не найдено</span> :
        (!isLoading && <MoviesCardList>
          {newMoviesList.map((movieSave) => (

            <MoviesCard key={movieSave._id} movie={movieSave} onMovieDelete={onMovieDelete} />

          ))}

        </MoviesCardList>)}

    </>
  );
}

export default SavedMovies;
