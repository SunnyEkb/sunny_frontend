import { FC } from "react";
import styles from "./userLK.module.scss";
import NavHeader from "../../components/navHeader/NavHeader";
import UserProfile from "../../components/userProfile/UserProfile";
import NavMenu from "../../components/navMenu/NavMenu";

const UserLK: FC = () => {
  return (
    <main className={styles.userLK}>
      <NavHeader />
      <UserProfile
        name="Имя пользователя"
        accountType="Частное лицо"
        rating={5.0}
        reviewsCount={20}
      />
      <NavMenu />
    </main>
  );
};

export default UserLK;
