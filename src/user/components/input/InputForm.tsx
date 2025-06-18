/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, forwardRef, InputHTMLAttributes, useState } from "react";
import "./input.scss";
import eye from "../../../assets/icon/eye-default.svg";
import eyeHidden from "../../../assets/icon/eye-hidden.svg";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder?: string;
  errors?: any;
  sing?: boolean;
  autoComplete?: string;
  inputTitle?: string;
}

const InputForm: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  function InputForm(
    { type, placeholder, errors, autoComplete, inputTitle, ...rest },
    ref
  ) {
    const [isShowed, setIsShowed] = useState(false);

    const handleClick = () => {
      setIsShowed(!isShowed);
    };

    const setType = () => (type === 'password' && !isShowed ? 'password' : 'text');

    const name = rest?.name as string | undefined;

    const inputClassName = [
      "input",
      name && errors?.[name]?.message && "input_error",
      type === "password" && "input_password", // Add input_password class
      type === "password" && !isShowed && "input_password-hidden"
    ].filter(Boolean).join(" ");

    return (
      <div className="container">
        <div className="inputContainer">
          <label className="label">{inputTitle}</label>
          <input
            ref={ref}
            type={setType()}

            placeholder={placeholder}

            className={inputClassName}
            autoComplete={autoComplete}
            {...rest}
          />
          {type === 'password' && (
            <button className="eye" type="button" onClick={handleClick}>
              <img className="eye__img" src={isShowed ? eye : eyeHidden} alt="hide" />
            </button>
          )}
          {name && errors?.[name]?.message && (
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
