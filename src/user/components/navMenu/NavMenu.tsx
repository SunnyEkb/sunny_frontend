import React from "react";
import styles from "./navMenu.module.scss";
import MenuItem from "../menuItem/MenuItem";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../store/auth-api/authApi";
import { paths } from "../../../app/paths";
import { useDispatch } from "react-redux";
import { setAuthenticated, setUser } from "../../../store/slices/authSlice";

const NavMenu: React.FC = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const [logout] = useLogoutMutation();

  const handleClick = async () => {
    try {
      await logout().unwrap();
      dispatch(setUser(null));
      dispatch(setAuthenticated(false))
      navigate(paths.index);
    } catch (error) {
      console.error("Возникла ошибка:", error);
    }
  };

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
      <MenuItem title="Выйти из профиля" subtitle="Сменить пользователя" onClick={handleClick} />
    </nav>
  );
};

export default NavMenu;
