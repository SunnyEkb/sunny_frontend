/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, forwardRef } from "react";
import "./input.scss"

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: any;
  sing?: boolean;
  autoComplete?: string;
}

const InputForm: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  function InputForm(
    { type, name, placeholder, onChange, errors, autoComplete },
    ref
  )
  {

    console.log(errors[name]?.message)
    return (
      <>
        <input
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          className={`input ${errors[name]?.message && "input_error" }`}
          autoComplete={autoComplete}
        />
        {errors && (
          <span className={`error input-error-${name}`}>
            {errors[name]?.message || ""}
          </span>
        )}
      </>
    );
  }
);

export default InputForm;
