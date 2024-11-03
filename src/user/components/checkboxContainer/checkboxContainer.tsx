import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./checkboxContainer.module.scss";

interface CheckboxContainerProps {
  checked: boolean;
  onToggle: () => void;
}

const CheckboxContainer: FC<CheckboxContainerProps> = ({ checked, onToggle }) => {
  return (
    <div className={styles.checkboxContainer}>
      <span
        className={`${styles.customCheckbox} ${checked ? styles.checked : ""}`}
        onClick={onToggle}
        tabIndex={0}
        role="checkbox"
        onKeyDown={(e) => {
          if (e.key === "Enter") onToggle();
        }}
      ></span>
      <label htmlFor="consent" className={styles.consentText}>
        Я даю согласие на обработку персональных данных в соответствии с&nbsp;
        <Link to="/policy" className={styles.consentText__link}>
          Политикой конфиденциальности
        </Link>
        &nbsp; и принимаю&nbsp;
        <Link to="/policy" className={styles.consentText__link}>
          Условия работы сервиса
        </Link>
        .
      </label>
    </div>
  );
};

export default CheckboxContainer;
