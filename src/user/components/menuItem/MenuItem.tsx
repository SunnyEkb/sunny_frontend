import { FC } from "react";
import styles from "./menuItem.module.scss";

export interface MenuItemProps {
  title: string;
  subtitle?: string;
  linkText?: string;
  danger?: boolean;
  onClick?: () => void;
}

const MenuItem: FC<MenuItemProps> = ({ title, subtitle, linkText, danger, onClick}) => {
  return (
    <div className={`${styles.menuItem} ${danger ? styles.danger : ""}`}>
      <div>
        <h2 className={styles.title} onClick={onClick}>{title}</h2>
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
