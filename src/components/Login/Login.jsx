import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';

const Login = ({ onLogin, isError, errorMessage }) => {

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
    onLogin(values);
    reset();
  }

  return (
    <>
      <Form
        typeOfForm={register}
        errors={errors}
        isValid={isValid}
        formHeading="Рады видеть!"
        onSubmit={handleSubmit(onSubmit)}
        emailLabel="Электронный адрес"
        passwordLabel="Пароль"
        textBtn="Войти"
        isError={isError}
        errorMessage={errorMessage}>

      </Form>
      <div className="form-reroute">
        <span className="form-reroute__text">Ещё не зарегистрированы?</span>
        <Link to="/signup" className="form-reroute__link">Регистрация</Link>
      </div>
    </>
  );
}

export default Login;
