import React from "react";
import defaultPhoto from "../../../../assets/icon/Foto.png";
import heartLike from "../../../../assets/icon/Heart.svg";
import heardLiked from "../../../../assets/icon/Heart_liked.svg";
import { useNavigate, useParams } from "react-router-dom";
import CardCatalogAuthor from "../../../../user/components/authorCardCatalog/CardCatalogAuthor";
import PriceLists from "../../CardCatalogBig/PriceList/PriceLists";
import { useAddToFavoritesMutation, useDeleteFromFavoritesMutation } from "../../../../store/entities/services/services";
import { AdsInfo } from "../../../../common/model/ads";
import style from "./cardCatalog.module.scss";

interface Props {
  title: string;
  card: AdsInfo;
}

export default function CardCatalog({ title, card }: Props) {
  const navigate = useNavigate();
  const params = useParams();

  function handleGoAds() {
    navigate(`/catalogs/${params.id}/ads/${card.id}`);
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
            src={card.images[0]?.image || defaultPhoto}
            alt="услуга"
            className={style.catalog__cardPhoto}
          />
        </div>

        <div className={style.catalog__cardInfo}>
          <div className={style.catalog__cardTitle} onClick={handleGoAds}>
            <div className={style.catalog__cardTitleText}>{title}</div>
            <img
              src={card.is_favorited ? heardLiked : heartLike}
              alt="like"
              onClick={handleClickLike}
              className={style.catalog__cardLike}
            />
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
