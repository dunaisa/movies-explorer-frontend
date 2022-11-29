import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Footer from '../Footer/Footer';
import HeaderMain from '../HeaderMain/HeaderMain';

const SavedMovies = ({ newMoviesList, onMovieDelete }) => {

  return (
    <>
      <Header headerClassName="header header-main header_type_movies">
        <HeaderMain />
      </Header>

      <SearchForm />

      <MoviesCardList>
        {newMoviesList.map((movieSave) => (

          <MoviesCard key={movieSave._id} movie={movieSave} onMovieDelete={onMovieDelete} />

        ))}

      </MoviesCardList>

      <Footer />

    </>
  );
}

export default SavedMovies;
