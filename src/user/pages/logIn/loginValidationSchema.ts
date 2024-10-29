import * as Yup from 'yup';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Напишите ваш email'),
  password: Yup.string()
    .required('Введите пароль'),
})

export default loginValidationSchema;
