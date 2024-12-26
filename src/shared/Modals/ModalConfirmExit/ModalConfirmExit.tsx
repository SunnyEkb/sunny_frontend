import React from "react";
import { RootModal } from "../../../app/layouts/RootModal/RootModal";
import style from "../style.module.scss";
import close from "../../../assets/icon/close.svg";
import ButtonForm from "../../button/button";

interface Props {
  onClose?: () => void;
  handleLogout: () => void;
}

export default function ModalConfirmExit({ onClose, handleLogout }: Props) {
  return (
    <RootModal onClose={onClose}>
      <div className={style.modal}>
        <div className={style.modal__iconWrapper}>
          {" "}
          <img
            className={style.modal__iconClose}
            alt="закрыть"
            src={close}
            onClick={onClose}
          />{" "}
        </div>
        <div className={style.modal__title}>Уже уходите?</div>
        <div className={style.modal__subtitle}>
          Вы действительно хотите выйти из профиля?
        </div>
        <div className={style.modal__containerButtons}>
          <ButtonForm type="button" title="Выйти" onClick={handleLogout} />
          <ButtonForm
            type="button"
            title="Остаться"
            onClick={onClose}
            extraClass={style.modal__buttonCancel}
          />
        </div>
      </div>
    </RootModal>
  );
}
