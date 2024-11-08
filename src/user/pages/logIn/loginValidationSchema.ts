import * as Yup from 'yup';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required('Напишите ваш email').nullable().trim(),
  password: Yup.string().required('Введите пароль').nullable().trim(),
})

export default loginValidationSchema;
