import { FC, ReactNode } from "react";
import NavHeader from "../../components/navHeader/NavHeader";
import styles from "./layuotUserLK.module.scss"

interface LayoutUserLKProps {
  children: ReactNode;
  title?: string;
  userLK?: boolean,
}

const LayoutUserLK: FC<LayoutUserLKProps> = ({children, title, userLK}) => {
  return (
    <main className={styles.layuotUserLK}>
      <NavHeader title={title} userLK={userLK}/>
      <section>{children}</section>
    </main>

  );
};

export default LayoutUserLK
