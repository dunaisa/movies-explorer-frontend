import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Footer from '../Footer/Footer';
import HeaderMain from '../HeaderMain/HeaderMain';

const SavedMovies = ({ newMoviesList }) => {

  const [menuActive, setMenuActive] = React.useState(false);
  const [crossBtn, setCrossBtn] = React.useState(false);

  const [deleteBtnShown, setDeleteBtnShown] = React.useState(false);

  const handleAddDeleteBtn = () => {
    setDeleteBtnShown(true)
  }

  const handleRemoveDeleteBtn = () => {
    setDeleteBtnShown(false)
  }

  return (
    <>
      <Header headerClassName="header header-main header_type_movies">
        <HeaderMain />
      </Header>

      <SearchForm />

      <MoviesCardList>
        <MoviesCard>
          {newMoviesList.map((movie) => (

            <MoviesCard key={movie.id} movie={movie} />

          ))}
        </MoviesCard>

      </MoviesCardList>

      <Footer />

    </>
  );
}

export default SavedMovies;
