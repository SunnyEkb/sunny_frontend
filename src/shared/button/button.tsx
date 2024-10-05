import { FC } from "react";
import "./button.scss";

interface ButtonFormProps {
  type: "button" | "reset" | "submit" | undefined;
  disabled?: boolean;
  title: string;
  onClick?: () => void;
  extraClass?: string;
}

const ButtonForm: FC<ButtonFormProps> = ({
  type,
  disabled,
  title,
  onClick,
  extraClass,
}) => {
  return (
    <button
      className={`btn ` + `${extraClass}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default ButtonForm;
