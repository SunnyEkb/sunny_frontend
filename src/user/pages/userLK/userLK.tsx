import { FC } from "react";
import styles from "./userLK.module.scss";
//import NavHeader from "../../components/navHeader/NavHeader";
import UserProfile from "../../components/userProfile/UserProfile";
import NavMenu from "../../components/navMenu/NavMenu";
import LayoutUserLK from "../../layout/layoutUserLK/LayoutUserLK";

const UserLK: FC = () => {
  return (
    <LayoutUserLK userLK={true}>
      <article className={styles.userLK}>
        <UserProfile
          name="Имя пользователя"
          accountType="Частное лицо"
          rating={5.0}
          reviewsCount={20}
        />
        <NavMenu />
      </article>
    </LayoutUserLK>
  );
};

export default UserLK;


//<NavHeader />

{/* <main className={styles.userLK}>
</main>
 */}
