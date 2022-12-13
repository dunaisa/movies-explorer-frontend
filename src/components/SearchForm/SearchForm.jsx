import React, { useState } from 'react';
import './SearchForm.css';
import btnIcon from '../../images/search-form-icon.svg';

const SearchForm = ({ handleInputChange, handleThumblerChange, setIsloading, isMainPage, onSavedInputChange, handleCheckBoxChange, localValue, localThumblerState, handleFirstPageLoading }) => {

  const [errorMessage, setErrorMessage] = useState('');

  const [inputValue, setInputValue] = useState(localValue ?? '');
  const [isThumblerActive, setIsThumblerActive] = useState(localThumblerState ?? false);

  const [inputSavedValue, setInputSavedValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSavedInputChange = (e) => {
    setInputSavedValue(e.target.value)
  }

  const toggleThumbler = () => {
    setIsThumblerActive(!isThumblerActive);
    handleThumblerChange(!isThumblerActive);
  }

  const toggleChecked = () => {
    setIsChecked(!isChecked)
    handleCheckBoxChange(!isChecked)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isMainPage) {
      if (!inputValue) {
        setErrorMessage('Нужно ввести ключевое слово');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      } else {
        handleFirstPageLoading(false)
        setIsloading(true)
        setTimeout(() => {
          handleInputChange(inputValue)
          handleThumblerChange(isThumblerActive)
          setIsloading(false)
        }, 2000);
      }
    } else {
      if (inputSavedValue.length === 0) {
        setErrorMessage('Нужно ввести ключевое слово');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      } else {
        onSavedInputChange(inputSavedValue)
        handleCheckBoxChange(isChecked)
      }
    }
  };

  return (
    <div className="search-form">
      <form action="post" className="search-form__container" onSubmit={handleSubmit} noValidate>

        <input
          name="text"
          className="search-form__input"
          type="text"
          placeholder="Фильм"
          required
          value={isMainPage ? inputValue : inputSavedValue}
          onChange={isMainPage ? handleChange : handleSavedInputChange}
        />
        <span className="search-form__text search-form__text_type_error">{errorMessage}</span>


        <button className="search-form__btn" type="post">
          <img src={btnIcon} alt="Кнопка поиска" className="search-form__btn-icon" />
        </button>
      </form>

      <div className="thumbler">
        <input
          type="checkbox"
          className="thumbler__input"
          name="thumbler"
          id="thumbler"
          checked={isMainPage ? isThumblerActive : isChecked}
          onChange={isMainPage ? toggleThumbler : toggleChecked}
        />
        <label htmlFor="thumbler" className="thumbler__label">Короткометражки</label>
      </div>

    </div>
  );
}

export default React.memo(SearchForm);