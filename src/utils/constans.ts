export const BASE_URL: string = 'https://sunnyekb.ru/api/v1/';

export const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : sessionStorage.getItem('token')
    ? sessionStorage.getItem('token')
    : '';
