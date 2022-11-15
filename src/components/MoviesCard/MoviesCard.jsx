import React from 'react';
import './MoviesCard.css';


const MoviesCard = ({ imageSrc, movieTitle, movieDuration, onMouseEnter, onMouseLeave, children }) => {
  return (
    <li className="movie" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
      <img src={imageSrc} alt="Обложка фильма" className="movie__image" />
      <div className="movie__info">
        <div className="movie__content">
          <h5 className="movie__heading">{movieTitle}</h5>
          {children}
        </div>
        <span className="movie__duration">{movieDuration}</span>
      </div>
    </li>
  );
}

export default MoviesCard;
