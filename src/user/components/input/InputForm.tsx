/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, forwardRef, useState } from "react";
import "./input.scss";
import eye from "../../../assets/icon/eye-default.svg";
import eyeHidden from "../../../assets/icon/eye-hidden.svg"

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
  )
  {
    const [isShowed, setIsShowed] = useState(false);

    const handleClick = () => {
			setIsShowed(!isShowed);
		};

		const setType = () => {
			if (type === 'password') {
				if (isShowed) return 'text';
				return 'password';
			}
			return type;
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
            onChange={onChange}
            className={`input ${errors[name]?.message && "input_error" }`}
            autoComplete={autoComplete}
          />
          {type === 'password' && (
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
