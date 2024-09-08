import { FC } from "react";
import './button.scss'

interface ButtonFormProps {
  type: "button" | "reset" | "submit" | undefined;
  disabled?: boolean;
  title: string;
  onClick?: () => void
}


const ButtonForm:FC<ButtonFormProps> = ({type, disabled, title, onClick}) => {

  return (
    <button
      className="btn"
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  )
};

export default ButtonForm;
