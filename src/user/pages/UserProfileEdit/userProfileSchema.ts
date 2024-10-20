import * as Yup from 'yup';

const userProfileSchema = Yup.object().shape({
  id: Yup.number(),
  username: Yup.string()
    .min(2, 'Минимум два символа')
    .max(40, 'Максимум сорок символов'),
  email: Yup.string()
    .email('Некорректный формат почты'),
  phone: Yup.string().notRequired()
    .matches(/^((\+7|7|8)+([0-9]){10})$/, 'Некорректный формат телефона'),
    avatar: Yup.mixed(),
});

export default userProfileSchema;
