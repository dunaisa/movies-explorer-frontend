import React from 'react';
import './Form.css';
import Logo from '../images/logo.svg';

const Form = ({ formHeading, onSubmit, nameLabel, emailLabel, passwordLabel, children, typeOfForm, errors, isValid, textBtn }) => {

  const formType = typeOfForm;
  const errorShow = errors;
  const btnValidation = isValid;

  return (
    <div className="form register login">
      <img src={Logo} alt="Логотип" className="form__logo" />
      <h1 className="form__heading">{formHeading}</h1>

      <form onSubmit={onSubmit} className="form__container" noValidate>
        <fieldset className="form__fieldset">


          {children}

          <div className="input-container">

            <input
              {...formType('email', {
                required: "Поле обязательно к заполнению.",
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Почта введена некорректно'
                }

              })}
              className="form__input"
              placeholder=" "
              id="email"
              type="email" />
            <label htmlFor="email" className="form__field">{emailLabel}</label>

            <span className="form__text form__text_type_error">{errorShow.email && errorShow.email.message}</span>

          </div>


          <div className="input-container">

            <input

              {...formType('password', {
                required: "Поле обязательно к заполнению.",
                minLength: {
                  value: 5,
                  message: "Минимальная длина пароля 5 символов."
                }
              })}

              className="form__input"
              placeholder=" "
              id="password"
              type="password" />
            <label htmlFor="password" className="form__field">{passwordLabel}</label>
            <span className="form__text form__text_type_error">{errorShow.password && errorShow.password.message}</span>

          </div>

        </fieldset>

        <button
          type="submit"
          className={`form__btn ${!btnValidation ? "form__btn_disabled" : ''}`}
          disabled={!btnValidation}>{textBtn}</button>

      </form>



    </div>
  );
}

export default Form;
