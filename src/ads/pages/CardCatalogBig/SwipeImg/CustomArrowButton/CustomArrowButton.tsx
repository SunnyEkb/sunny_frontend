import style from "./style.module.scss";
import arrowLeft from "../../../../../assets/icon/arrow-left.svg";
import arrowRight from "../../../../../assets/icon/arrowRight.svg";
import "./style.css";

interface Props {
  onClick?: () => void;
  variant: "right" | "left";
}

export default function CustomArrowButton({ onClick, variant }: Props) {
  return (
    <button
      type="button"
      className={`${style.button} ${
        variant == "right" ? "custom-prev-button " : "custom-next-button "
      }`}
      onClick={onClick}
    >
      <img src={variant == "right" ? arrowRight : arrowLeft} alt="arrow" />
    </button>
  );
}
