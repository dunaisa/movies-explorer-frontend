import React from 'react';
import './Form.css';
import Logo from '../images/logo.svg';

const Form = ({ formHeading, onSubmit, nameLabel, emailLabel, passwordLabel, children, typeOfForm, errors, isValid }) => {

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


          <label htmlFor="email" className="form__field">{emailLabel}
            <input
              {...formType('email', {
                required: "Поле обязательно к заполнению.",
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Почта введена некорректно'
                }

              })}
              className="form__input"

              id="email"
              type="email" />

            <span className="form__text form__text_type_error">{errorShow.email && errorShow.email.message}</span>
          </label>



          <label htmlFor="password" className="form__field">{passwordLabel}
            <input
              className="form__input"
              {...formType('password', {
                required: "Поле обязательно к заполнению.",
                minLength: {
                  value: 5,
                  message: "Минимальная длина пароля 5 символов."
                }
              })}
              id="password"
              type="password" />

            <span className="form__text form__text_type_error">{errorShow.password && errorShow.password.message}</span>
          </label>


        </fieldset>

        <button
          type="submit"
          className={`form__btn ${!btnValidation ? "form__btn_disabled" : ''}`}
          disabled={!btnValidation}>Зарегистрироваться</button>

      </form>



    </div>
  );
}

export default Form;
