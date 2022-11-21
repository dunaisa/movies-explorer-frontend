import React from 'react';
import './MoviesCard.css';


const MoviesCard = ({ movie, onMouseEnter, onMouseLeave }) => {

  const { duration, nameRU, image, trailerLink } = movie;

  return (
    <li className="movie" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
      <a href={trailerLink} className="movie__link" target="_blank" rel="noreferrer">
        <img src={`https://api.nomoreparties.co/${image.url}`} alt={nameRU} className="movie__image" />
      </a>
      <div className="movie__info">
        <div className="movie__content">
          <h5 className="movie__heading">{nameRU}</h5>
          <button className="movie__like-btn"></button>
        </div>
        <span className="movie__duration">{duration} мин</span>
      </div>
    </li>
  );
}

export default MoviesCard;
