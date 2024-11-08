import { paths } from "../../../app/paths";

export interface Inputs {
  username?: string;
  phone?: string;
  password?: string;
  confirmation?: string;
  email?: string;
}

export interface InputFieldConfig {
  type: string;
  name: keyof Inputs;
  placeholder: string;
  inputTitle: string;
  autoComplete?: string;
  pages: typeof paths[keyof typeof paths][];
}

// Общий массив для всех полей инпутов
// в pages указываем на каких страницах использовать этот инпут
const inputFields: InputFieldConfig[] = [
  { inputTitle: "Имя", type: "text", name: "username", placeholder: "", pages: [paths.register, paths.user_profile_edit] },
  { inputTitle: "Электронная почта", type: "text", name: "email", placeholder: "", pages: [paths.auth, paths.register, paths.passwordRecovery, paths.user_profile_edit] },
  { inputTitle: "Телефон", type: "text", name: "phone", placeholder: "+7", pages: [paths.register, paths.user_profile_edit] },
  { inputTitle: "Пароль", type: "password", name: "password", placeholder: "", autoComplete: "on", pages: [paths.auth, paths.register] },
  { inputTitle: "Повторите пароль", type: "password", name: "confirmation", placeholder: "", autoComplete: "on", pages: [paths.register] },
];

// Функция фильтрации полей по значению пути
const getInputFieldsForPath = (path: typeof paths[keyof typeof paths]) => {
  return inputFields.filter(field => field.pages.includes(path));
};

// Получение полей для страницы "Вход"
export const loginFields = getInputFieldsForPath(paths.auth);

// Получение полей для страницы "Регистрация"
export const registerFields = getInputFieldsForPath(paths.register);

// Получение полей для страницы "Восстановление пароля"
export const passwordRecoveryFields = getInputFieldsForPath(paths.passwordRecovery);

//Получение полей для страницы "Мой профиль"
export const profileEditFields = getInputFieldsForPath(paths.user_profile_edit);
