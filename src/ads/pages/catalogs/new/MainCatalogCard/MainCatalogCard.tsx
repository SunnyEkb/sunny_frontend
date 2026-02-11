import { ISearchItem } from "../../../../../store/entities/search/searchApi";
import photo from "../../../../../assets/PhotoContainer.png";
import Heart from "../../../../../assets/icon/Heart.svg?react";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";
import { forwardRef, memo } from "react";
import { BASE_URL } from "../../../../../utils/constans";
import { useAppSelector } from "../../../../../store/store";
import { useAuthModal } from "../../../../../user/providers/AuthModalContext";
import {
  useAddToFavoritesAdsMutation,
  useDeleteToFavoritesAdsMutation,
} from "../../../../../store/entities/ads/adsApi";

const MainCatalogCard = forwardRef<HTMLElement, ISearchItem>(
  (mainCard, ref) => {
    const user = useAppSelector((state) => state.auth.user);
    const { openLogin } = useAuthModal();

    const [addToFavorite] = useAddToFavoritesAdsMutation();
    const [deleteFromFavorite] = useDeleteToFavoritesAdsMutation();

    const handleClickLike = async () => {
      if (mainCard.is_favorited) {
        await deleteFromFavorite({
          type: mainCard.type,
          id: mainCard.id,
        }).unwrap();
      } else {
        await addToFavorite({
          type: mainCard.type,
          id: mainCard.id,
        }).unwrap();
      }
    };

    return (
      <article className={styles.card} ref={ref}>
        <Link
          to={
            mainCard.type === "ad"
              ? `/ad/${mainCard.id}`
              : `/service/${mainCard.id}`
          }
        >
          <img
            src={
              mainCard.title_photo?.title_photo
                ? BASE_URL.replace("/api/v1/", "") + mainCard.title_photo?.image
                : photo
            }
            loading="lazy"
            alt={mainCard.title}
            className={styles.cardImg}
          />{" "}
        </Link>
        <div className={styles.cardHead}>
          <h4 className={styles.cardTitle}>
            <Link
              to={
                mainCard.type === "ad"
                  ? `/ad/${mainCard.id}`
                  : `/service/${mainCard.id}`
              }
            >
              {mainCard.title}
            </Link>
          </h4>
          <button
            className={styles.cardLike}
            onClick={() => {
              if (!user) {
                openLogin();
                return;
              }
              handleClickLike();
            }}
          >
            <Heart
              fill={`${mainCard.is_favorited ? "#ff0000" : "transparent"}`}
            />
          </button>
        </div>
        <span>
          {mainCard.price || 1000}&nbsp;₽{" "}
          {mainCard.type === "service" && "за услугу"}
        </span>
        <address className={styles.cardAddres}>
          {mainCard.address || "ул. Лучистая, 16"}
        </address>
      </article>
    );
  },
);

export default memo(MainCatalogCard);
