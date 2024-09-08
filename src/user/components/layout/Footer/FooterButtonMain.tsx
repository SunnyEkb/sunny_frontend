import React from "react";
import style from "./style.module.scss";
import main from "../../../../assets/icon/menu/main.svg";
import search from "../../../../assets/icon/menu/search.svg";
import plusAds from "../../../../assets/icon/menu/plus-circle.svg";
import info from "../../../../assets/icon/menu/info.svg";
import logIn from "../../../../assets/icon/menu/log-in.svg";
import user from "../../../../assets/icon/menu/user.svg";
import { useNavigate } from "react-router-dom";

const mockLinkMenu = [
  {
    id: 1,
    title: "Главная",
    icon: main,
    link: "/",
  },
  {
    id: 2,
    title: "Поск",
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
    id: 4,
    title: "О нас",
    icon: info,
    link: "/about",
  },
  {
    id: 5,
    title: "Выйти",
    icon: logIn,
    link: "/",
  },
  {
    id: 6,
    title: "Профиль",
    icon: user,
    link: "/profile",
  },
];

export default function FooterButtonMain() {
  const navigate = useNavigate();
  return (
    <footer className={style.footer}>
      <div className={style.footerList}>
        {mockLinkMenu.map((item) => {
          return (
            <div
              key={item.id}
              className={style.item}
              onClick={() => navigate(item.link)}
            >
              <img
                src={item.icon}
                alt={item.title}
                className={style.linkIcon}
              />
              <div className={style.linkTitle}>{item.title}</div>
            </div>
          );
        })}
      </div>
    </footer>
  );
}
