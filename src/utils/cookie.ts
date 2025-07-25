import { User } from "../store/slices/authSlice";

export enum CookieEnum {
  refresh = 'refresh',
  access = 'access',
  id_token = 'id_token',
  currentUser = 'currentUser',
  locale = 'locale',
}

type TMultiType = number | string | boolean;

type TCookieValue = TMultiType | Date;

type TCookieProps = {
  path?: string;
  expires?: TCookieValue;
} & { [name: string]: TCookieValue };

export function setCookie(
  name: string,
  value: TMultiType,
  props?: TCookieProps,
): void {
  props = {
    path: '/',
    domain: `${window.location.hostname}`,
    ...props,
  };

  let exp = props.expires;
  if (typeof exp === 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp instanceof Date) {
    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
    }
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)',
    ),
  );
  const returnData = matches ? decodeURIComponent(matches[1]) : undefined;

  return returnData;
}

export function cleanTokenCookies(cookiesNames: string[]): void {
  cookiesNames.forEach((cookie) => {
    setCookie(cookie, '');
  });
}

export function getUserInfoFromCookie(): Partial<User> | null {
  const userInfoString = getCookie(CookieEnum.currentUser);

  if (userInfoString) {
    try {
      const userInfo = JSON.parse(userInfoString);
      if (typeof userInfo === 'object' && userInfo !== null) {
        return userInfo;
      } else {
        console.error('getUserInfoFromCookie: Parsed data is not an object.');
        return null;
      }
    } catch (error) {
      console.error('getUserInfoFromCookie: Error parsing JSON:', error);
      return null;
    }
  } else {
    return null; // Cookie не найден
  }
}
