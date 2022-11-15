import React from 'react';
import './SearchForm.css';
import btnIcon from '../../images/search-form-icon.svg';

const SearchForm = () => {
  return (
    <div className="search-form">
      <form action="post" className="search-form__container">
        <input type="text" className="search-form__input" placeholder="Фильмы" />
        <button className="search-form__btn">
          <img src={btnIcon} alt="" className="search-form__btn-icon" />
        </button>
      </form>

      <div className="thumbler">
        <input type="checkbox" className="thumbler__input" id="thumbler" />
        <label htmlFor="thumbler" className="thumbler__label">Короткометражки</label>
      </div>

    </div>
  );
}

export default SearchForm;
