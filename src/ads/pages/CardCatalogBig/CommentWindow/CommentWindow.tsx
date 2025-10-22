import React from "react";
import arrowBack from "../../../../assets/icon/arrowLeft.svg";
import styles from "./styles.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useAddCommentMutation } from "../../../../store/entities/services/services";
import Rating from "../Comment/Rating";

interface Props {
  onClose: () => void;
}

interface PropsForm {
  feedback: string;
}

export default function CommentWindow({ onClose }: Props) {
  const navigate = useNavigate();
  const [addComment] = useAddCommentMutation();
  const params = useParams();

  const methods = useForm<PropsForm>({
    defaultValues: {
      feedback: "",
    },
    // resolver: yupResolver(createAdsValidSchema),
    mode: "all",
  });

  const onSubmit = async (data: PropsForm) => {
    console.log("data", data);
    if (params.idAds) {
      await addComment({
        id: params.idAds,
        feedback: data.feedback,
        rating: 5,
      });
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <img
            src={arrowBack}
            alt={"back"}
            className={styles.arrow}
            onClick={onClose}
          />
        </div>

        <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
          <Rating
            extraClass={styles.ratingWrapper}
            extraClassStar={styles.starSize}
          />
          <h4 className={styles.cardBig__section__title}>Напишите отзыв</h4>
          <Controller
            control={methods.control}
            name="feedback"
            render={({ field }) => (
              <textarea
                className={styles.input}
                {...field}
                maxLength={2000}
                // type="text"
                name="title"
                placeholder={
                  "Дополните свою оценку комментарием. Напишите, что понравилось."
                }
              />
            )}
          />
          <div className={styles.input__notif}>Не более 2000 символов</div>

          <div className={styles.wrapperButton}>
            <button className={styles.cardBig__button} type="submit">
              Отправить отзыв
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
