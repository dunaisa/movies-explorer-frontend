import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';


const MoviesCard = ({ movie, onMouseEnter, onMouseLeave, onMovieSave, onMovieDelete }) => {

  const location = useLocation();

  const [isLikeActive, setIsLikeActive] = useState(false);

  const movieImageLink = `https://api.nomoreparties.co/${movie.image.url}`;

  const likeBtn = `movie__like-btn ${!isLikeActive ? "" : "movie__like-btn_active"}`
  const deleteBtn = 'movie__delete-btn movie__delete-btn_type_active';

  const hadleMovieSave = () => {
    setIsLikeActive(true)
    console.log(movie)
    onMovieSave(movie)
  }

  const hadleMovieDelete = () => {
    onMovieDelete(movie._id)
  }

  return (
    <li className="movie" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
      <a href={movie.trailerLink} className="movie__link" target="_blank" rel="noreferrer">
        <img src={location.pathname === "/movies" ? movieImageLink : movie.image} alt={movie.nameRU} className="movie__image" />
      </a>
      <div className="movie__info">
        <div className="movie__content">
          <h5 className="movie__heading">{movie.nameRU}</h5>

          {location.pathname === "/movies" ? <button className={likeBtn} type="button" onClick={hadleMovieSave}></button> : <button className={deleteBtn} type="button" onClick={hadleMovieDelete}></button>}
        </div>
        <span className="movie__duration">{movie.duration} мин</span>
      </div>
    </li>
  );
}

export default MoviesCard;
