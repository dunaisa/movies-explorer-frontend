import React, { useEffect, useCallBack, useState } from 'react';
import { useForm } from 'react-hook-form';
import './SearchForm.css';
import { useFormWithValidation } from '../../utils/useForm';
import btnIcon from '../../images/search-form-icon.svg';

const SearchForm = ({ onSearch, onChange, query, isThumblerActive, toggleThumbler }) => {

  // const {
  //   register,
  //   formState: {
  //     errors,
  //   },
  //   handleSubmit,
  //   reset
  // } = useForm({
  //   mode: "onChange"
  // });

  // const onSearchSubmit = (values) => {
  //   console.log(values)
  //   onSearch(values);
  //   reset();
  // }

  const formWithValidation = useFormWithValidation();
  const { searchText } = formWithValidation.values;
  const { handleChange, resetForm } = formWithValidation;


  // useEffect(() => {
  //   resetForm();
  // }, [resetForm]);

  // const [value, setValues] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchText) {
      setError('Нужно ввести ключевое слово');
      setTimeout(() => {
        setError('');
      }, 2000);
    } else {
      onSearch(searchText);
      // resetForm();
    }
  };

  return (
    <div className="search-form">
      <form action="post" className="search-form__container" onSubmit={handleSubmit} noValidate>

        {/* <input
          {...register('query', {
            required: "Нужно ввести ключевое слово.",

          })}
          className="search-form__input"
          placeholder="Фильмы"
          id="query"
          type="text"
          value={query}
          onChange={onChange} />
        <span className="search-form__text search-form__text_type_error">{errors.query && errors.query.message}</span> */}

        <input
          name="searchText"
          className="search-form__input"
          type="text"
          placeholder="Фильмы"
          required
          value={searchText || ''}
          onChange={handleChange}
        />
        <span className="search-form__text search-form__text_type_error">{error}</span>


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
          checked={isThumblerActive}
          onChange={toggleThumbler}
        />
        <label htmlFor="thumbler" className="thumbler__label">Короткометражки</label>
      </div>

    </div>
  );
}

export default SearchForm;
