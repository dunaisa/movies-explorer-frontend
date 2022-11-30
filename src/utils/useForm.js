import React, { useCallback } from "react";

//хук управления формой
// export function useForm() {
//   const [values, setValues] = React.useState({});
//   const [errors, setErrors] = React.useState({});
//   const [isValid, setIsValid] = React.useState(false);

//   const handleChange = (event) => {
//     const target = event.target;
//     const name = target.name;
//     const value = target.value;
//     setValues({ ...values, [name]: value });
//     setErrors({ ...errors, [name]: target.validationMessage });
//     setIsValid(target.closest("form").checkValidity());
//   };

//   return [values, handleChange, errors, isValid];
// }

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    // const target = event.target;
    // const name = target.name;
    // const value = target.value;
    setValues({ ...values, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: event.target.validationMessage });
    setIsValid(event.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
};