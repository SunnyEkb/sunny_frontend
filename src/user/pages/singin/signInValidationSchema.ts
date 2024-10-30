import * as Yup from 'yup';

const signInValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Минимум два символа')
    .max(40, 'Максимум сорок символов')
    .required('Напишите ваше имя'),
  email: Yup.string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, 'Некорректный формат почты')
    .required('Напишите ваш email'),
  phone: Yup.string()
    .matches(/^((\+7|7|8)+([0-9]){10})$/, 'Некорректный формат телефона')
    .required('Напишите ваш телефон'),
  password: Yup.string()
    .matches(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g, 'латинские буквы, 1 заглавная, 8 символов, 1 спецсимвол, 1 цифра')
    .required('Придумайте пароль'),
  confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли не совпадают')
    .required('Повторите пароль')
})

export default signInValidationSchema;
