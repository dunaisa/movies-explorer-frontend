import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import movieImage from '../../images/movie-image/movie-image.jpg';


const MoviesCardList = () => {
  return (
    <div className="movies">
      <ul className="movies__container">
        <MoviesCard imageSrc={movieImage} movieTitle="33 слова о дизайне" movieDuration="1ч 47м" />
        <MoviesCard imageSrc={movieImage} movieTitle="33 слова о дизайне" movieDuration="1ч 47м" />
        <MoviesCard imageSrc={movieImage} movieTitle="33 слова о дизайне" movieDuration="1ч 47м" />
        <MoviesCard imageSrc={movieImage} movieTitle="33 слова о дизайне" movieDuration="1ч 47м" />
        <MoviesCard imageSrc={movieImage} movieTitle="33 слова о дизайне" movieDuration="1ч 47м" />
      </ul>
    </div>
  );
}

export default MoviesCardList;
