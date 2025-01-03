import { FC, useEffect } from "react";
import styles from "./userLK.module.scss";
import UserProfile from "../../components/userProfile/UserProfile";
import NavMenu from "../../components/navMenu/NavMenu";
import LayoutUserLK from "../../layout/layoutUserLK/LayoutUserLK";
import { useAppSelector } from "../../../store/store";
import { useLazyCheckAuthQuery } from "../../../store/auth-api/authApi";
import { setUser } from "../../../store/slices/authSlice";
import { useDispatch } from "react-redux";

const UserLK: FC = () => {
  const dispatch = useDispatch();

  //получаем данный из стейта
  const userProfile = useAppSelector((state) => state.auth.user);

  // Запрос для получения данных пользователя
  const [fetchUserMe] = useLazyCheckAuthQuery();

  useEffect(() => {
    if (!userProfile) {
      const loadUserData = async () => {
        try {
          const user = await fetchUserMe().unwrap();
          dispatch(setUser(user));
        } catch (err) {
          console.error("Ошибка при загрузке данных пользователя:", err);
        }
      };
      loadUserData();
    }
  }, [userProfile, dispatch, fetchUserMe]);

  return (
    <LayoutUserLK userLK={true}>
      <article className={styles.userLK}>
        <UserProfile
          name={userProfile ? userProfile.username : "Неизвестно"}
          accountType="Частное лицо"
          rating={5.0}
          reviewsCount={20}
          avatarUrl={userProfile?.avatar}
        />
        <NavMenu />
      </article>
    </LayoutUserLK>
  );
};

export default UserLK;

