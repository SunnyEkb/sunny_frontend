import { FC } from "react";
import './button.scss'

interface ButtonFormProps {
  type: "button" | "reset" | "submit" | undefined;
  disabled?: boolean;
  title: string
}


const ButtonForm:FC<ButtonFormProps> = ({type, disabled, title}) => {

  return (
    <button
      className="btn"
      type={type}
      disabled={disabled}
    >
      {title}
    </button>
  )
};

export default ButtonForm;
