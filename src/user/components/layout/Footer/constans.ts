import main from "../../../../assets/icon/menu/main.svg";
import search from "../../../../assets/icon/menu/search.svg";
import plusAds from "../../../../assets/icon/menu/plus-circle.svg";
import logIn from "../../../../assets/icon/menu/log-in.svg";
import user from "../../../../assets/icon/menu/user.svg";

const mockLinkMenu = [
  {
    id: 1,
    title: "Главная",
    icon: main,
    link: "/",
  },
  {
    id: 2,
    title: "Поиск",
    icon: search,
    link: "/",
  },
  {
    id: 3,
    title: "Объявление",
    icon: plusAds,
    link: "/catalogs",
  },
  {
    id: 5,
    title: "Выйти",
    icon: logIn,
    link: "/",
    action: "logout",
  },
  {
    id: 6,
    title: "Профиль",
    icon: user,
    link: "/profile",
  },
];

export const mockLogin = {
  id: 5,
  title: "Войти",
  icon: logIn,
  link: "/auth",
  action: "login",
};

export default mockLinkMenu;
