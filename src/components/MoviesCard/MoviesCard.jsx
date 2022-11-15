import React from 'react';
import './MoviesCard.css';


const MoviesCard = ({ imageSrc, movieTitle, movieDuration }) => {
  return (
    <li className="movie">
      <img src={imageSrc} alt="Обложка фильма" className="movie__image" />
      <div className="movie__info">
        <div className="movie__content">
          <h5 className="movie__heading">{movieTitle}</h5>
          <button className="movie__like-btn"></button>
        </div>
        <span className="movie__duration">{movieDuration}</span>
      </div>
    </li>
  );
}

export default MoviesCard;
