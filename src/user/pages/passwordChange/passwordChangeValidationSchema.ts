import * as Yup from "yup";

export interface FormValuesPasswordChange {
  currentPassword: string;
  password: string;
  confirmation: string;
}


const passwordChangeValidationSchema: Yup.ObjectSchema<FormValuesPasswordChange>  = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Поле должно быть заполнено")
    .trim(),
  password: Yup.string()
    .matches(
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
      "Пароль от 8 до 25 символов, с латинскими буквами, хотя бы одной заглавной, цифрой и символом из !@#$%^&*"
    )
    .required("Придумайте пароль")
    .trim(),
  confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Пароли не совпадают")
    .required("Повторите пароль")
    .trim(),
});

export default passwordChangeValidationSchema;
