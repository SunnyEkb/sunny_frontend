import arrowBack from "../../../assets/icon/arrow-left.svg";
import share from "../../../assets/icon/Share.svg";
import SwipeImg from "./SwipeImg/SwipeImg";
import CardCatalogAuthor from "../../../user/components/authorCardCatalog/CardCatalogAuthor";
import DescriptionList from "./DescriptionList/DescriptionList";
import PriceLists from "./PriceList/PriceLists";
import { getFormatDate } from "../../../utils/getFormatDate";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from "react-router-dom";
import {
  useAddToFavoritesMutation,
  useDeleteFromFavoritesMutation,
} from "../../../store/entities/services/services";
import { ServiceInfo } from "../../../common/model/ads";
import { HeartIcon } from "../../../shared/HeartIcon/HeartIcon";

import style from "./cardCatalogBig.module.scss";
import { useLayoutEffect, useState } from "react";
import CommentSection from "./CommentSection/CommentSection";
import Notifications from "../../../shared/notification/Notification";

interface LoaderParams {
  idAds?: string;
  idService?: string;
  id: string; //catalog
}

export const loaderAdsByCatalogId = async ({
  params,
}: LoaderFunctionArgs<LoaderParams>) => {
  const response = await fetch(
    `https://sunnyekb.ru/api/v1/${params?.idAds ? "ads" : "services"}/${
      params?.idAds ? params.idAds : params.idService
    }/`,
    {
      credentials: "include",
    },
  );

  return response;
};

export default function CardCatalogBig() {
  const navigate = useNavigate();
  const initialCardData = useLoaderData();
  const [cardData, setCardData] = useState(initialCardData);
  const { revalidate } = useRevalidator();
  const isAd = cardData.type === "ad";
  const [copy, setMessage] = useState<{
    message: string;
    status: "error" | "success";
  } | null>();

  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, []);

  function handleGoBack() {
    navigate(-1);
  }

  const [addToFavorite] = useAddToFavoritesMutation();
  const [deleteFromFavorite] = useDeleteFromFavoritesMutation();

  const handleClickLike = async () => {
    const previousData = { ...cardData };

    setCardData((prev: ServiceInfo) => ({
      ...prev,
      is_favorited: !prev.is_favorited,
    }));

    try {
      if (cardData.is_favorited) {
        await deleteFromFavorite(cardData.id).unwrap();
      } else {
        await addToFavorite(cardData.id).unwrap();
      }
      revalidate();
    } catch (error) {
      setCardData(previousData);
    }
  };
  const formattedDate = getFormatDate(cardData.created_at);

  return (
    <div className={style.cardBig}>
      {copy && (
        <Notifications messageText={copy.message} status={copy.status} />
      )}
      <section className={style.breadcrumbs}>
        <a href="/">Главная</a> &gt; <span>На районе</span> &gt;{" "}
        <span>Красота и здоровье</span> &gt;{" "}
        <span>
          {" "}
          <span>Маникюр, педикюр</span>
        </span>
      </section>

      <section className={style.cardBig__settings}>
        <button
          onClick={handleGoBack}
          className={style.cardBig__settings__button}
        >
          <img src={arrowBack} alt="back" className={style.cardBig__img} />
        </button>

        <div className={style.cardBig__settings__panel}>
          <button
            className={style.cardBig__settings__button}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(location.href);
                setMessage({
                  message: "Ссылка скопирована",
                  status: "success",
                });
              } catch (e) {
                setMessage({
                  message: "Не удалось скопировать ссылку",
                  status: "error",
                });
              }
            }}
          >
            <img src={share} className={style.cardBig__img} />
          </button>

          <button
            onClick={handleClickLike}
            className={style.cardBig__settings__button}
          >
            <HeartIcon is_favorited={cardData.is_favorited} />
          </button>
        </div>
      </section>

      <SwipeImg imgList={cardData.images} />

      <div>
        <h1 className={style.cardBig__cardTitleText}>{cardData.title}</h1>
        <span className={style.cardBig__cardSubtitleText}>
          1000 ₽ {!isAd && "за услугу"}
        </span>
      </div>

      {cardData.address && (
        <address className={style.cardBig__address}>{cardData.address}</address>
      )}

      <CardCatalogAuthor card={cardData} />

      <DescriptionList card={cardData} isAd={isAd} />

      {!isAd && <PriceLists variant="bigInfo" cardData={cardData} />}

      <section className={style.cardBig__section}>
        <h4 className={style.cardBig__section__title}>Описание</h4>

        <div className={style.cardBig__section__description}>
          {cardData.description}
        </div>
        <div className={style.cardBig__section__description}>
          {cardData.description}
        </div>
      </section>

      <section className={style.cardBig__section}>
        <CommentSection comments={cardData.comments} />
      </section>

      <section className={style.cardBig__section}>
        <div className={style.cardBig__info}> Объявление № {cardData.id}</div>
        <div className={style.cardBig__info}>Размещено {formattedDate}</div>
        <div className={style.cardBig__info}> Просмотров 790</div>
      </section>
    </div>
  );
}
