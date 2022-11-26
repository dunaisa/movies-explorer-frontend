import React, { useState } from 'react';
import './EditProfileForm.css';
import { useForm } from 'react-hook-form';

const EditProfileForm = ({ onEdit, isUserName, isUserEmail, signOut, isError, errorMessage }) => {

  // const [name, setName] = useState(isUserName);

  const {
    register,
    formState: {
      errors,
      isValid
    },
    handleSubmit,
    reset
  } = useForm({
    mode: "onChange"
  });

  const onSubmit = (values) => {
    onEdit(values);
    reset();
  }

  return (
    <div className="edit-form">
      <span className="edit-form__heading">{`Привет, ${isUserName}!`}</span>

      <form className="edit-form__container" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="edit-form__fieldset">

          <div className="edit-form__field">
            <label htmlFor="email" className="edit-form__label">Имя</label>

            <input
              {...register('name', {
                required: "Поле обязательно к заполнению.",
                minLength: {
                  value: 2,
                  message: "Минимальная длина имени 2 символа."
                }

              })}
              className="edit-form__input"
              placeholder={isUserName}
              id="name-edit"
              type="text" />


            <span className="edit-form__text edit-form__text_type_error">{errors.name && errors.name.message}</span>

          </div>

          <div className="edit-form__field">
            <label htmlFor="email" className="edit-form__label">E-mail</label>
            <input
              {...register('email', {
                required: "Поле обязательно к заполнению.",
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Почта введена некорректно'
                }

              })}
              className="edit-form__input"
              placeholder={isUserEmail}
              id="email"
              type="email" />


            <span className="edit-form__text edit-form__text_type_error">{errors.email && errors.email.message}</span>

          </div>

        </fieldset>
        <span className={`edit-form__error ${isError ? "form__error_type_visible" : ""}`}>{errorMessage}</span>

        <button
          type="submit"
          className={`edit-form__btn ${!isValid ? "edit-form__btn_disabled" : ''}`}
          disabled={!isValid}>Редактировать</button>
      </form>




      <button className="edit-form__signout" onClick={signOut}>Выйти из аккаунта</button>


    </div>
  );
}

export default EditProfileForm;
