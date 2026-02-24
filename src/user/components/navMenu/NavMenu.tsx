import React from "react";
import styles from "./navMenu.module.scss";
import MenuItem from "../menuItem/MenuItem";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../store/auth-api/authApi";
import { paths } from "../../../app/paths";
import { useDispatch } from "react-redux";
import {
  clearUser,
  setAuthenticated,
  setUser,
} from "../../../store/slices/authSlice";
import ModalConfirmExit from "../../../shared/Modals/ModalConfirmExit/ModalConfirmExit";
import ModalConfirmDelete from "../../../shared/Modals/ModalConfirmDelete/ModalConfirmDelete";
import {
  useGetCommentsQuery,
  useGetFavoritesQuery,
  useGetUserAdvertisementsQuery,
} from "../../../store/entities/services/services";
import { useAppSelector } from "../../../store/store";

const NavMenu: React.FC = () => {
  const { data: favorites } = useGetFavoritesQuery();
  const { data: advertisments } = useGetUserAdvertisementsQuery();
  const { data: comments } = useGetCommentsQuery();
  const [isOpen, setOpen] = React.useState(false);
  const [isOpenModalDelete, setOpenModalDelete] = React.useState(false);
  const user = useAppSelector((state) => state.auth.user);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleOpenModalDelete = () => {
    setOpenModalDelete(true);
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [logout] = useLogoutMutation();

  const handleClick = async () => {
    try {
      dispatch(setUser(null));
      dispatch(clearUser());
      dispatch(setAuthenticated(false));
      await logout().unwrap();
      navigate(paths.index);
      // window.location.reload();
      // window.location.href = "/";
    } catch (error) {
      console.error("Возникла ошибка:", error);
    }
  };

  return (
    <>
      <nav className={styles.menu}>
        <MenuItem
          title="Мои объявления"
          subtitle={`${advertisments?.count || 0} объявлений`}
          linkText="/my-ads"
        />
        <MenuItem title="Мои отзывы" subtitle={`${comments?.count || 0} отзывов`} linkText="/my-reviews" />
        <MenuItem
          title="Избранное"
          subtitle={`${favorites?.count || 0} избранных`}
          linkText="/favorites"
        />
        <MenuItem title="Сообщения" subtitle="2 непрочитанных" />
        <MenuItem
          title="Удаление профиля"
          subtitle="Всё содержимое будет стёрто"
          onClick={handleOpenModalDelete}
          danger
        />
        <MenuItem title="Выйти из профиля" onClick={handleOpen} />
      </nav>

      {isOpen && (
        <ModalConfirmExit onClose={handleClose} handleLogout={handleClick} />
      )}
      {isOpenModalDelete && (
        <ModalConfirmDelete onClose={handleCloseModalDelete} />
      )}
    </>
  );
};

export default NavMenu;
