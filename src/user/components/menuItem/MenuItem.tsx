import { FC } from "react";
import styles from "./menuItem.module.scss";
import { Link } from "react-router-dom";

export interface MenuItemProps {
  title: string;
  subtitle?: string;
  linkText?: string;
  danger?: boolean;
  onClick?: () => void;
}

const MenuItem: FC<MenuItemProps> = ({
  title,
  subtitle,
  linkText,
  danger,
  onClick,
}) => {
  return (
    <div className={`${styles.menuItem} ${danger ? styles.danger : ""}`}>
      {linkText ? (
        <Link to={linkText} className={styles.link}>
          {" "}
          <div>
            <h2 className={styles.title} onClick={onClick}>
              {title}
            </h2>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>
        </Link>
      ) : (
        <>
          {" "}
          <h2 className={styles.title} onClick={onClick}>
            {title}
          </h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </>
      )}
    </div>
  );
};

export default MenuItem;
