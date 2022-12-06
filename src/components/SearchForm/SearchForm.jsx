import React from 'react';
import { useForm } from 'react-hook-form';
import './SearchForm.css';
import { useFormWithValidation } from '../../utils/useForm';
import btnIcon from '../../images/search-form-icon.svg';

const SearchForm = ({ onSearch, onChange, query, isThumblerActive, toggleThumbler }) => {

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    reset
  } = useForm({
    mode: "onChange"
  });

  const onSearchSubmit = (values) => {
    onSearch(values);
    reset();
  }

  return (
    <div className="search-form">
      <form action="post" className="search-form__container" onSubmit={handleSubmit(onSearchSubmit)} noValidate>

        <input
          {...register('query', {
            required: "Нужно ввести ключевое слово.",

          })}
          className="search-form__input"
          placeholder="Фильмы"
          id="query"
          type="text"
          value={query}
          onChange={onChange} />
        <span className="search-form__text search-form__text_type_error">{errors.query && errors.query.message}</span>


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
