export interface Inputs {
  username: string;
  phone: string;
  password: string;
  confirmation: string;
  email: string;
}

export interface InputFieldConfig {
  type: string;
  name: keyof Inputs;
  placeholder: string;
  inputTitle: string;
  autoComplete?: string;
}

/* Массив для полей ввода на странице "Регистрация" */
export const inputFields: InputFieldConfig[] = [
  { type: "text", name: "username", placeholder: "", inputTitle: "Имя" },
  { type: "text", name: "email", placeholder: "", inputTitle: "Электронная почта" },
  { type: "text", name: "phone", placeholder: "+7", inputTitle: "Телефон" },
  { type: "password", name: "password", placeholder: "", inputTitle: "Пароль", autoComplete: "on" },
  { type: "password", name: "confirmation", placeholder: "", inputTitle: "Повторите пароль", autoComplete: "on" },
];
