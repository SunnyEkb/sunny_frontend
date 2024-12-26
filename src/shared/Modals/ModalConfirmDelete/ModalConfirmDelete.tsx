import React from "react";
import { RootModal } from "../../../app/layouts/RootModal/RootModal";
import style from "../style.module.scss";
import close from "../../../assets/icon/close.svg";
import ButtonForm from "../../button/button";

interface Props {
  onClose?: () => void;
  // handleDelete: () => void;
}

export default function ModalConfirmDelete({ onClose }: Props) {
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
        <div className={style.modal__title}>
          Вы действительно хотите удалить все данные пользователя?
        </div>
        <div className={style.modal__subtitle}>
          При удалении будут безвозвратно утрачены ваши: учётная запись,
          сообщения, фото, комментарии, оценки.
        </div>
        <div className={style.modal__containerButtons}>
          <ButtonForm
            type="button"
            title="Удалить"
            extraClass={style.modal__buttonDelete}
          />
          <ButtonForm
            type="button"
            title="Оставить"
            onClick={onClose}
            extraClass={style.modal__buttonCancel}
          />
        </div>
      </div>
    </RootModal>
  );
}
