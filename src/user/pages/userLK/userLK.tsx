import { FC } from "react";
import styles from "./userLK.module.scss";
//import NavHeader from "../../components/navHeader/NavHeader";
import UserProfile from "../../components/userProfile/UserProfile";
import NavMenu from "../../components/navMenu/NavMenu";
import LayoutUserLK from "../../layout/layoutUserLK/LayoutUserLK";
import avatarUrl from "../../../assets/kapibara-avatar-mock.jpg"
import { useAppSelector } from "../../../store/store";

const UserLK: FC = () => {

  const userProfile = useAppSelector((state) => state.auth.user);

  return (
    <LayoutUserLK userLK={true}>
      <article className={styles.userLK}>
        <UserProfile
          name={userProfile ? userProfile.username : "Неизвестно"}
          accountType="Частное лицо"
          rating={5.0}
          reviewsCount={20}
          avatarUrl={avatarUrl}
        />
        <NavMenu />
      </article>
    </LayoutUserLK>
  );
};

export default UserLK;
