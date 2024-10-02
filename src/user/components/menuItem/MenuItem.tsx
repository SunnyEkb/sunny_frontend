import { FC } from "react";
import styles from "./menuItem.module.scss";

interface MenuItemProps {
  title: string;
  subtitle: string;
  linkText?: string;
  danger?: boolean;
}

const MenuItem: FC<MenuItemProps> = ({ title, subtitle, linkText, danger }) => {
  return (
    <div className={`${styles.menuItem} ${danger ? styles.danger : ""}`}>
      <div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      {linkText && (
        <a href="#" className={styles.linkText}>
          {linkText}
        </a>
      )}
    </div>
  );
};

export default MenuItem;
