import React from "react";
import styles from "./navMenu.module.scss";
import MenuItem from "../menuItem/MenuItem";

const NavMenu: React.FC = () => {
  return (
    <nav className={styles.menu}>
      <MenuItem
        title="Мои объявления"
        subtitle="6 объявлений"
        linkText="Добавить объявление"
      />
      <MenuItem
        title="Мои отзывы"
        subtitle="12 отзывов"
        linkText="Добавить отзыв"
      />
      <MenuItem title="Избранное" subtitle="10 избранных" />
      <MenuItem title="Сообщения" subtitle="2 непрочитанных" />
      <MenuItem
        title="Удаление профиля"
        subtitle="Всё содержимое будет стёрто"
        danger
      />
      <MenuItem title="Выйти из профиля" subtitle="Сменить пользователя" />
    </nav>
  );
};

export default NavMenu;
