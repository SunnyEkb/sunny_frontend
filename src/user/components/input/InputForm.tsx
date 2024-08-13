/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, forwardRef, useState } from "react";
import "./input.scss";
import eye from "../../../assets/icon/eye-default.svg";
import eyeHidden from "../../../assets/icon/eye-hidden.svg"
import { phoneMask } from "../../../utils/phoneMask";


interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: any;
  sing?: boolean;
  autoComplete?: string;
  inputTitle?: string;
}

const InputForm: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  function InputForm(
    { type, name, placeholder, onChange, errors, autoComplete, inputTitle },
    ref
  ) {
    const [isShowed, setIsShowed] = useState(false);
    const [value, setValue] = useState(''); // состояние для хранения значения input

    const handleClick = () => {
      setIsShowed(!isShowed);
    };

    const setType = () => {
      if (type === "password") {
        if (isShowed) return "text";
        return "password";
      }
      return type;
    };

    // функция для обработки изменения ввода
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;
      if (name === 'phone') { // Применение маски только для поля телефона
        newValue = phoneMask(e.target.value);
      }
      setValue(newValue); // Установка нового значения в состояние
      if (onChange) {
        onChange({
          ...e,
          target: {
            ...e.target,
            value: newValue // Передача нового значения в onChange
          }
        });
      }
    };

    return (
      <div className="container">
        <div className="inputContainer">
          <label className="label">{inputTitle}</label>
          <input
            ref={ref}
            type={setType()}
            name={name}
            placeholder={placeholder}
            value={value} // Установлено значение из состояния
            onChange={handleInputChange} // Использование новой функции для обработки изменений
            className={`input ${errors[name]?.message && "input_error" }`}
            autoComplete={autoComplete}
          />
          {type === "password" && (
            <button className="eye" type="button" onClick={handleClick}>
              <img src={isShowed ? eye : eyeHidden} alt="hide" />
            </button>
          )}
          {errors && (
            <span className={`error input-error-${name}`}>
              {errors[name]?.message || ""}
            </span>
          )}
        </div>
      </div>
    );
  }
);

export default InputForm;
