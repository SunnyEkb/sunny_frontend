import { FC } from "react";
import styles from "./crossCloseButton.module.scss";

interface CrossCloseButtonProps {
  onClick: () => void;
}

const CrossCloseButton: FC<CrossCloseButtonProps> = ({ onClick }) => (
  <button className={styles.closeButton} onClick={onClick}>
    {/* Крестик из псевдоэлементов */}
  </button>
);

export default CrossCloseButton;
