import { createPortal } from "react-dom";
import styles from "./rootModalStyle.module.scss";

interface Props {
  backdropFilter?: "blur";
  onClose?: () => void;
  children?: React.ReactNode;
}

export const RootModal = ({
  backdropFilter,
  onClose,
  children,
}: Props): JSX.Element | null => {
  const modalElement = document.getElementById("modal");

  if (!modalElement) {
    return null;
  }

  return createPortal(
    <div
      className={`${styles.modal} ${backdropFilter && styles.modal__filter}`}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    modalElement
  );
};
