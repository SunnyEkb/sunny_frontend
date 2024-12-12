import * as Yup from "yup";

export interface FormValuesNewPassword {
  password: string;
  confirmation: string;
}


const newPasswordValidationSchema: Yup.ObjectSchema<FormValuesNewPassword> =
  Yup.object().shape({
    password: Yup.string()
      .matches(
        /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
        "латинские буквы, 1 заглавная, 8 символов, 1 спецсимвол, 1 цифра"
      )
      .required("Придумайте пароль")
      .trim(),
    confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Пароли не совпадают")
      .required("Повторите пароль")

      .trim(),
  });

export default newPasswordValidationSchema;
