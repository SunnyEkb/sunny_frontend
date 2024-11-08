import * as Yup from 'yup';

const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Напишите ваш email')
    .trim(),
})

export default emailValidationSchema;
