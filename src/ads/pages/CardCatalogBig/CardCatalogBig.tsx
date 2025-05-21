import arrowBack from "../../../assets/icon/arrow-left.svg";
import share from "../../../assets/icon/Share.svg";
import heart from "../../../assets/icon/Heart.svg";
import heartLiked from "../../../assets/icon/Heart_liked.svg";
import SwipeImg from "./SwipeImg/SwipeImg";
import CardCatalogAuthor from "../../../user/components/authorCardCatalog/CardCatalogAuthor";
import DescriptionList from "./DescriptionList/DescriptionList";
import PriceLists from "./PriceList/PriceLists";
import style from "./cardCatalogBig.module.scss";

import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import {
  useAddToFavoritesMutation,
  useDeleteFromFavoritesMutation,
} from "../../../store/entities/services/services";
import { AdsInfo } from "../../../common/model/ads";


interface LoaderParams {
  idAds: string;
  id: string; //catalog
}


export const loaderAdsByCatalogId = async ({
  params,
}: LoaderFunctionArgs<LoaderParams>) => {
  const response = await fetch(
    `https://sunnyekb.ru/api/v1/services/${params.idAds}/`, {
      credentials: "include"
    }
  );
  return response;
};

export default function CardCatalogBig() {
  const navigate = useNavigate();
  const cardData = useLoaderData() as AdsInfo;
  function handleGoBack() {
    navigate(-1);
  }

  const [addToFavorite] = useAddToFavoritesMutation();
  const [deleteFromFavorite] = useDeleteFromFavoritesMutation();

  const handleClickLike = async () => {
    if (cardData.is_favorited) {
      await deleteFromFavorite(cardData.id).unwrap();
    } else {
      await addToFavorite(cardData.id).unwrap();
    }
  };

  const getFormatDate = (dateTime: string) => {
    const date = new Date(dateTime);

    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const formattedDate = `${day} ${month} ${hours}:${minutes}`;

    return formattedDate;
  };
  return (
    <div className={style.cardBig}>
      <header className={style.cardBig__header}>
        <h1 className={style.cardBig__headerTitle}>Солнечный Екб</h1>
      </header>

      <section className={style.cardBig__settings}>
        <img
          src={arrowBack}
          alt="back"
          className={style.cardBig__img}
          onClick={handleGoBack}
        />

        <div className={style.cardBig__panel}>
          <img src={share} className={style.cardBig__img} />
          <img
            src={cardData.is_favorited ? heartLiked : heart}
            className={style.cardBig__img}
            onClick={handleClickLike}
          />
        </div>
      </section>

      <SwipeImg imgList={cardData.images} />

      <div className={style.cardBig__title}>
        <h2 className={style.cardBig__cardTitleText}>{cardData.title}</h2>
        <div className={style.cardBig__cardSubtitleText}>1000 ₽ за услугу</div>
      </div>

      <div className={style.cardBig__cardCity}>{cardData.address}</div>

      <div className={style.cardBig__cardContact}>
        <CardCatalogAuthor card={cardData} />

        <button className={style.cardBig__cardButton}>Написать</button>
      </div>

      <DescriptionList card={cardData} />

      <PriceLists variant="bigInfo" cardData={cardData} />

      <section className={style.cardBig__section}>
        <h4 className={style.section__title}>Описание</h4>

        <div className={style.section__description}>{cardData.description}</div>
      </section>

      <section className={style.cardBig__section}>
        <div className={style.cardBig__info}> Объявление № {cardData.id}</div>
        <div className={style.cardBig__info}>
          Размещено {getFormatDate(cardData.created_at)}
        </div>
        <div className={style.cardBig__info}> Просмотров 790</div>
      </section>


    </div>
  );
}
