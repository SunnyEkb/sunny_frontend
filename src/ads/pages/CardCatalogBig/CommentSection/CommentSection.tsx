import React, { useState } from "react";
import style from "./style.module.scss";
import CommentItem from "../Comment/Comment";
import { Controller, useForm } from "react-hook-form";
import { useAddCommentMutation } from "../../../../store/entities/services/services";
import { useParams } from "react-router-dom";
import CommentWindow from "../CommentWindow/CommentWindow";

interface PropsForm {
  feedback: string;
}

export default function CommentSection() {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [addComment] = useAddCommentMutation();
  const params = useParams();

  const handleButtonClick = () => {
    setIsInputVisible((prev) => !prev);
  };

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
    <>
      <h4 className={style.cardBig__section__title}>Отзывы клиентов</h4>

      {!isInputVisible && (
        <button className={style.cardBig__button} onClick={handleButtonClick}>
          Оставить отзыв
        </button>
      )}

      {isInputVisible && (
        <CommentWindow onClose={handleButtonClick} />
        // <form onSubmit={methods.handleSubmit(onSubmit)} className={style.form}>
        //   <Controller
        //     control={methods.control}
        //     name="feedback"
        //     render={({ field }) => (
        //       <input
        //         className={style.input}
        //         {...field}
        //         type="text"
        //         name="title"
        //         placeholder={"Ваш комментарий"}
        //       />
        //     )}
        //   />

        //   <button className={style.cardBig__button} type="submit">
        //     Отправить отзыв
        //   </button>
        // </form>
      )}

      <CommentItem />
      <CommentItem />
      <CommentItem />
    </>
  );
}
