import React, { useEffect } from 'react';
import './EditProfileForm.css';
// import { useForm } from 'react-hook-form';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/useForm';

const EditProfileForm = ({ onEdit, signOut, isError, errorMessage }) => {

  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const onSubmit = (evt) => {
    evt.preventDefault();
    onEdit(values);
    resetForm();
  }

  return (
    <div className="edit-form">
      <span className="edit-form__heading">{`Привет, ${currentUser.name}!`}</span>

      <form className="edit-form__container" onSubmit={onSubmit} noValidate>
        <fieldset className="edit-form__fieldset">

          <div className="edit-form__field">
            <label htmlFor="email" className="edit-form__label">Имя</label>

            <input
              value={values.name || ''}
              name="name"
              onChange={handleChange}
              minLength="2"
              className="edit-form__input"
              placeholder={currentUser.name}
              id="name"
              type="text"
              required />
            <span className="edit-form__text edit-form__text_type_error">{errors.name}</span>

          </div>

          <div className="edit-form__field">
            <label htmlFor="email" className="edit-form__label">E-mail</label>
            <input
              value={values.email || ''}
              onChange={handleChange}
              className="edit-form__input"
              placeholder={currentUser.email}
              id="email"
              type="email"
              name="email"
              required />


            <span className="edit-form__text edit-form__text_type_error">{errors.email}</span>

          </div>

        </fieldset>
        <span className={`edit-form__error ${isError ? "edit-form__error_type_visible" : ""}`}>{errorMessage}</span>

        <button
          type="submit"
          className={`edit-form__btn ${(isValid && (values.name !== currentUser.name
            || values.email !== currentUser.email)) ? "" : 'edit-form__btn_disabled'}`}
          disabled={(values.name === currentUser.name
            && values.email === currentUser.email) || !isValid}>Редактировать</button>
      </form>




      <button className="edit-form__signout" onClick={signOut}>Выйти из аккаунта</button>


    </div>
  );
}

export default EditProfileForm;
