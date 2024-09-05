import style from "./style.module.scss";
import arrowBack from "../../../assets/icon/arrow-left.svg";
import share from "../../../assets/icon/Share.svg";
import heart from "../../../assets/icon/Heart.svg";
import SwipeImg from "./SwipeImg/SwipeImg";
import CardCatalogAuthor from "../../../user/components/authorCardCatalog/CardCatalogAuthor";
import DescriptionList from "./DescriptionList/DescriptionList";
import PriceLists from "./PriceList/PriceLists";
import { descriptionText } from "./mock";
import Footer from "../../../user/components/footer/Footer";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";

interface LoaderParams {
  idAds: string;
  id: string; //catalog
}

export const loaderAdsByCatalogId = async ({
  params,
}: LoaderFunctionArgs<LoaderParams>) => {
  const response = await fetch(
    `https://sunnyekb.ru/api/v1/services/${params.idAds}/`
  );
  return response;
};

export default function CardCatalogBig() {
  const navigate = useNavigate();
  const cardData = useLoaderData() as any;
  console.log(cardData);
  function handleGoBack() {
    navigate(-1);
  }
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
          <img src={heart} className={style.cardBig__img} />
        </div>
      </section>

      <SwipeImg imgList={cardData.images}/>

      <div className={style.cardBig__title}>
        <h2 className={style.cardBig__cardTitleText}>{cardData.title}</h2>
        <div className={style.cardBig__cardSubtitleText}>1000 ₽ за услугу</div>
      </div>

      <div className={style.cardBig__cardCity}>ул. Лучистая, 16</div>

      <div className={style.cardBig__cardContact}>
        <CardCatalogAuthor card={cardData}/>

        <button className={style.cardBig__cardButton}>Написать</button>
      </div>

      <DescriptionList />

      <PriceLists variant="bigInfo" />

      <section className={style.cardBig__section}>
        <h4 className={style.section__title}>Описание</h4>

        <div className={style.section__description}>{descriptionText}</div>
      </section>

      <section className={style.cardBig__section}>
        <div className={style.cardBig__info}> Объявление № 12345</div>
        <div className={style.cardBig__info}> Размещено 31 мая 18:55</div>
        <div className={style.cardBig__info}> Просмотров 790</div>
      </section>

      <Footer />
    </div>
  );
}
