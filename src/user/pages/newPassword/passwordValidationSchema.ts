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
        "Пароль должен содержать 8-25 символов, латинские буквы, заглавную букву, цифру и символ из !@#$%^&*."
      )
      .required("Придумайте пароль")
      .trim(),
    confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Пароли не совпадают")
      .required("Повторите пароль")

      .trim(),
  });

export default newPasswordValidationSchema;
