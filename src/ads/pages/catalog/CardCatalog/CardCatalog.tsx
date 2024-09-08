import style from "./style.module.scss";
import defaultPhoto from "../../../../assets/icon/Foto.png";
import heartLike from "../../../../assets/icon/Heart.svg";
import { useNavigate } from "react-router-dom";
import CardCatalogAuthor from "../../../../user/components/authorCardCatalog/CardCatalogAuthor";
import PriceLists from "../../CardCatalogBig/PriceList/PriceLists";

interface Props {
  title: string
}

export default function CardCatalog({title}: Props) {
  const navigate = useNavigate();

  function handleGoAds() {
    navigate(`/catalogs/${1}/ads/${2}`);
  }
  return (
    <section className={style.catalog__cardList}>
      <div className={style.catalog__card}>
        <img
          src={defaultPhoto}
          alt="услуга"
          className={style.catalog__cardPhoto}
        />

        <div className={style.catalog__cardTitle}>
          <div className={style.catalog__cardTitleWrapper}>
            <div className={style.catalog__cardTitleText}>{title}</div>
            <div className={style.catalog__cardSubtitleText}>
              1000 ₽ за услугу
            </div>
          </div>
          <img src={heartLike} alt="like" className={style.catalog__cardLike} />
        </div>

        <PriceLists variant="smallInfo"/>

        <div className={style.catalog__cardCity}>ул. Лучистая, 16</div>
      </div>

      <div className={style.catalog__cardContact}>
        <CardCatalogAuthor />

        <div className={style.catalog__buttons}>
          <button className={style.catalog__cardButton} onClick={handleGoAds}>
            Позвонить
          </button>
          <button className={style.catalog__cardButton} onClick={handleGoAds}>
            Написать
          </button>
        </div>
      </div>
    </section>
  );
}
