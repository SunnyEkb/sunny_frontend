import React from "react";
import defaultPhoto from "../../../../assets/icon/Foto.png";
import { useNavigate, useParams } from "react-router-dom";
import CardCatalogAuthor from "../../../../user/components/authorCardCatalog/CardCatalogAuthor";
import PriceLists from "../../CardCatalogBig/PriceList/PriceLists";
import {
  useAddToFavoritesMutation,
  useDeleteFromFavoritesMutation,
} from "../../../../store/entities/services/services";
import { ServiceInfo } from "../../../../common/model/ads";
import style from "./cardCatalog.module.scss";
import { useAppDispatch } from "../../../../store/store";
import { HeartIcon } from "../../../../shared/HeartIcon/HeartIcon";
import { BASE_URL } from "../../../../utils/constans";

interface Props {
  title: string;
  card: ServiceInfo;
}

export default function CardCatalog({ title, card }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  function handleGoAds() {
    navigate(`/catalogs/${params.id}/service/${card.id}`);
  }

  const [addToFavorite] = useAddToFavoritesMutation();
  const [deleteFromFavorite] = useDeleteFromFavoritesMutation();

  const handleClickLike = async () => {
    if (card.is_favorited) {
      await deleteFromFavorite(card.id).unwrap();
    } else {
      await addToFavorite(card.id).unwrap();
    }
  };

  return (
    <section className={style.catalog__cardList}>
      <div className={style.catalog__card}>
        <div className={style.catalog__imageWrapper} onClick={handleGoAds}>
          <img
            src={
              card?.title_photo?.title_photo
                ? BASE_URL.replace("/api/v1", "") + card.title_photo?.image
                : defaultPhoto
            }
            alt="услуга"
            className={style.catalog__cardPhoto}
          />
        </div>

        <div className={style.catalog__cardInfo}>
          <div className={style.catalog__cardTitle}>
            <div className={style.catalog__cardTitleText} onClick={handleGoAds}>
              {title}
            </div>
            <button
              className={style.catalog__cardLike}
              onClick={handleClickLike}
            >
              <HeartIcon is_favorited={card.is_favorited} />
            </button>
          </div>
          <div className={style.catalog__cardSubtitleText}>
            1000 ₽ за услугу
          </div>

          <PriceLists variant="smallInfo" cardData={card} />
        </div>

        <div className={style.catalog__cardPublisher}>
          <CardCatalogAuthor card={card} />
        </div>
      </div>
    </section>
  );
}
