/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UserProfileFormInputs {
  id: number;
  username?: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string;
  phone?: string;
  password?: string;
  avatar?: File | string | null;
}

export interface InputFieldConfig {
  type: string;
  name: keyof UserProfileFormInputs;
  placeholder: string;
  inputTitle: string;
  validation?: any;
}

/* Массив для полей ввода страницы "Мой профиль" */
export const inputFields: InputFieldConfig[] = [
  {
    type: "text",
    name: "username",
    placeholder: "",
    inputTitle: "Имя",
    validation: {
      minLength: { value: 2, message: "Минимум два символа" },
      maxLength: { value: 40, message: "Максимум сорок символов" },
    },
  },
  {
    type: "text",
    name: "email",
    placeholder: "",
    inputTitle: "Электронная почта",
    validation: {
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
        message: "Некорректный формат почты",
      },
    },
  },
  {
    type: "text",
    name: "phone",
    placeholder: "+7",
    inputTitle: "Телефон",
    validation: {
      pattern: {
        value: /^((\+7|7|8)+([0-9]){10})$/,
        message: "Некорректный формат телефона. Начните с +7, 7 или 8 и введите 10 цифр после.",
      },
    },
  },
];
