import { useEffect } from "react";
import style from "./authorCard.module.scss";
import Star from "../../../assets/icon/Star.svg?react";
import { ServiceInfo } from "../../../common/model/ads";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/store";
import { useAuthModal } from "../../providers/AuthModalContext";

interface Props {
  card: ServiceInfo;
}

export default function CardCatalogAuthor({ card }: Props) {
  const user = useAppSelector((state) => state.auth.user);
  const { openLogin } = useAuthModal();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const handleGoAds = () => {
    if (user) {
      navigate(`/chat/${card.type}/${card.id}/${user.id}`);
    } else {
      openLogin();
    }
  };

  useEffect(() => {
    if (!location.hash) return;
    const element = document.querySelector(location.hash);

    if (element) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 0);
    }
  }, [location]);

  return (
    <div className={style.author__card}>
      <h3 className={style.catalog__cardAuthor}>
        {`${
          card.provider.first_name ||
          card.provider.username ||
          card.provider.email
        } `}{" "}
        / {card.salon_name || "Название салона"}
      </h3>

      <div className={style.catalog__cardRaiting}>
        <div>4,9</div>

        <div className={style.catalog__cardCountStars}>
          {Array.from({ length: 5 }, (_, idx) => idx + 1).map((rat) => (
            <Star key={rat} color="#ffcc33" />
          ))}
        </div>

        <Link
          to={
            location.pathname.startsWith("/catalogs/")
              ? `/catalogs/${params.id}/service/${card.id}#reviews`
              : "#reviews"
          }
          className={style.commentsLink}
        >
          {card.comments_quantity} отзывов
        </Link>
      </div>

      <div className={style.catalog__buttons}>
        <button className={style.catalog__cardButton} onClick={handleGoAds}>
          Написать
        </button>
      </div>
    </div>
  );
}
