import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Form from '../../Form/Form';

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
    <>
      <Form
        typeOfForm={register}
        errors={errors}
        isValid={isValid}
        formHeading="Добро пожаловать!"
        onSubmit={handleSubmit(onSubmit)}
        nameLabel="Имя"
        emailLabel="Электронный адрес"
        passwordLabel="Пароль">

        <label htmlFor="name" className="form__field">Имя
          <input
            {...register('name', {
              required: "Поле обязательно к заполнению.",
              minLength: {
                value: 2,
                message: "Минимальная длина имени 2 символа."
              }

            })}
            className="form__input"

            id="name"
            type="text" />

          <span className="form__text form__text_type_error">{errors.name && errors.name.message}</span>
        </label>
      </Form>

      <div className="form-reroute">
        <span className="form-reroute__text">Уже зарегистрированы?</span>
        <Link to="/signin" className="form-reroute__link">Войти</Link>
      </div>
    </>
  );
}

export default Register;

