import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Form from '../../Form/Form';
import './Register.css';

const Register = ({ onRegister }) => {

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
    onRegister(values);
    reset();
  }

  return (
    <Form
      typeOfForm={register}
      errors={errors}
      isValid={isValid}
      formHeading="Добро пожаловать!"
      onSubmit={handleSubmit(onSubmit)}
      nameLabel="Имя"
      emailLabel="Электронный адрес"
      passwordLabel="Пароль">

      <div className="register__signin">
        <span className="register__signin register__signin_text">Уже зарегистрированы?
        </span>
        <Link to="/signin" className="register__signin register__signin_link">Войти</Link>
      </div>

    </Form>
  );
}

export default Register;

