import { useGetCommentsQuery } from "../../../store/entities/services/services";
import { CustomLoader } from "../../../shared/customLoader/customLoader";
import Star from "../../../assets/icon/Star.svg?react";

import styles from "./UserReviews.module.scss";
import { Link } from "react-router-dom";

const UserReviews = () => {
  const { data: comments, isLoading, isSuccess } = useGetCommentsQuery();

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Мои отзывы</h1>

      {isLoading && <CustomLoader />}
      {!!comments?.results.length && (
        <>
          {comments.results.map((comment) => (
            <div
              key={comment.obj_type + comment.object_id}
              className={styles.comment}
            >
              {Array.from({ length: 5 }, (_, idx) => idx).map((rat) => {
                const isActive = rat < comment.rating;
                return (
                  <Star
                    key={rat}
                    color={`${isActive ? "#ffcc33" : "transparent"}`}
                    stroke={`${isActive ? "#FFCC33" : "#b2bdc7"}`}
                  />
                );
              })}
              <h2 className={styles.commentTitle}>
                <Link
                  to={`/${comment.obj_type}/${comment.object_id}`}
                  className={styles.commentLink}
                >
                  {comment.title}
                </Link>
              </h2>
              <p>{comment.feedback}</p>
            </div>
          ))}
        </>
      )}
      {!comments?.results.length && isSuccess && (
        <p className={styles.empty}>Пусто</p>
      )}
    </main>
  );
};

export default UserReviews;
