export interface Inputs {
  password: string;
  email: string;
}

export interface InputFieldConfig {
  type: string;
  name: keyof Inputs;
  placeholder: string;
  inputTitle: string;
}

/* Массив для полей ввода на странице "Вход" */
export const inputFields: InputFieldConfig[] = [
  { type: "text", name: "email", placeholder: "", inputTitle: "Электронная почта" },
  { type: "password", name: "password", placeholder: "", inputTitle: "Пароль" },
];
