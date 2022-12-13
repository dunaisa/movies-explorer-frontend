import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

const MoviesCard = ({ movie, onMouseEnter, onMouseLeave, isLiked, onMovieSave, onMovieDelete, isMainPage }) => {

  // console.log('render MoviesCard')
  const location = useLocation();

  const movieImageLink = `https://api.nomoreparties.co/${movie.image.url}`;


  const deleteBtn = 'movie__delete-btn movie__delete-btn_type_active';
  const likeBtn = `movie__like-btn ${isLiked ? "movie__like-btn_active" : ""}`

  const toggleLike = () => {
    if (isMainPage) {
      if (!isLiked) {
        onMovieSave(movie)
      }
      else {
        onMovieDelete(movie)
      }
    } else {
      onMovieDelete(movie)
    }
  }

  const durationChange = (time) => {
    const hours = Math.trunc(time / 60);
    const minutes = time % 60;
    return `${hours > 0 ? `${hours} ч ` : ''}${minutes} мин`;
  }

  return (
    <li className="movie" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
      <a href={movie.trailerLink} className="movie__link" target="_blank" rel="noreferrer">
        <img src={location.pathname === "/movies" ? movieImageLink : movie.image} alt={movie.nameRU} className="movie__image" />
      </a>
      <div className="movie__info">
        <div className="movie__content">
          <h5 className="movie__heading">{movie.nameRU}</h5>

          {location.pathname === "/movies" ? <button className={likeBtn} type="button" onClick={toggleLike}></button> : <button className={deleteBtn} type="button" onClick={toggleLike}></button>}
        </div>
        <span className="movie__duration">{durationChange(movie.duration)}</span>
      </div>
    </li>
  );
}

export default React.memo(MoviesCard);
