import React from 'react';
import './MoviesCard.css';


const MoviesCard = ({ movie, onMouseEnter, onMouseLeave, onMovieSave }) => {

  const hadleMovieSave = () => {
    onMovieSave(movie)
  }

  return (
    <li className="movie" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
      <a href={movie.trailerLink} className="movie__link" target="_blank" rel="noreferrer">
        <img src={`https://api.nomoreparties.co/${movie.image.url}`} alt={movie.nameRU} className="movie__image" />
      </a>
      <div className="movie__info">
        <div className="movie__content">
          <h5 className="movie__heading">{movie.nameRU}</h5>
          <button className="movie__like-btn" type="button" onClick={hadleMovieSave}></button>
        </div>
        <span className="movie__duration">{movie.duration} мин</span>
      </div>
    </li>
  );
}

export default MoviesCard;
