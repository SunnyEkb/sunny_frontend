import * as Yup from 'yup';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Напишите ваш email').nullable(),
  password: Yup.string()
    .required('Введите пароль').nullable(),
})

export default loginValidationSchema;
