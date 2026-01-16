import React from "react";
import arrowBack from "../../../../assets/icon/arrowLeft.svg";
import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useAddCommentMutation } from "../../../../store/entities/services/services";
import Rating from "../Comment/Rating";
import Notifications from "../../../../shared/notification/Notification";
import { useAddCommentAdsMutation } from "../../../../store/entities/ads/adsApi";

interface Props {
  onClose: () => void;
}

interface PropsForm {
  feedback: string;
  rating: number;
}

interface PropsParams {
  id: string;
  idService?: string;
  idAds?: string;
}

export default function CommentWindow({ onClose }: Props) {
  const [addComment] = useAddCommentMutation();
  const [addCommentAds] = useAddCommentAdsMutation();
  const params = useParams() as unknown as PropsParams;
  const [message, setMessage] = React.useState<{
    message: string;
    status: "success" | "error";
  } | null>(null);

  const methods = useForm<PropsForm>({
    defaultValues: {
      feedback: "",
      rating: 0,
    },
    mode: "all",
  });

  const onSubmit = async (data: PropsForm) => {
    let res;
    if (params.idService) {
      try {
        res = await addComment({
          id: params.idService,
          feedback: data.feedback,
          rating: data.rating,
        });
      } catch (e) {
        console.error("e", e);
      }
    }

    if (params.idAds) {
      try {
        res = await addCommentAds({
          id: params.idAds,
          feedback: data.feedback,
          rating: data.rating,
        });
      } catch (e) {
        console.error("e", e);
      }
    }

    if (res?.error) {
      const error = res.error as { data: string; status: number };
      setMessage({ message: error.data, status: "error" });
    }
    if (res?.data) {
      setMessage({ message: res.data, status: "success" });
    }
  };

  const handleChooseRating = (rating: number) => {
    methods.setValue("rating", rating);
  };

  return (
    <section className={styles.section}>
      {message && (
        <Notifications messageText={message.message} status={message.status} />
      )}
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
            onClick={handleChooseRating}
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
