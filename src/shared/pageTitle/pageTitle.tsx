import { FC } from "react";
import styles from "./pageTitle.module.scss";

interface PageTitleProps {
  title: string;
}

const PageTitle: FC<PageTitleProps> = ({ title }) => {
  return (
    <h2 className={styles.PageTitle}>{title}</h2>
  );
};

export default PageTitle;
