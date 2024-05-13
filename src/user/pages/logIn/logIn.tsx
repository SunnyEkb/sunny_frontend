/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./LogIn.scss";
import UserForm from "../../components/form/UserForm";
import InputForm from "../../components/input/InputForm";

interface Inputs {
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
}

const LogIn: FC = () => {
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    reset,
  } = useForm<Inputs>({
    mode: "onChange",
  });

  useEffect(() => {
    const defaultValues: Inputs = {
      password: "",
      email: "",
    };
    reset(defaultValues);
  }, [reset]);

  const onSubmit = (data: Inputs) => {
    console.log(data);
  };

  const title = "Войти"

  return (
    <div className="LogIn">
      <h2>Вход</h2>
      <UserForm
        name="registration"
        onSubmit={handleSubmit(onSubmit)}
        isValid={isValid}
        isDirty={isDirty}
        title={title}
      >
        <InputForm
          type="text"
          {...register("email", {
            required: "Напишите ваш email",
            /* pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
              message: "Некорректный формат почты",
            }, */
          })}
          name="email"
          errors={errors}
          placeholder="Электронная почта"
        />

        <InputForm
          type="password"
          {...register("password", {
            required: "Введите пароль",
            /* 								minLength: {
                                    value: 8,
                                    message: 'Минимум восемь символов',
                                },
                                maxLength: {
                                    value: 40,
                                    message: 'Пароль - не более сорок символов',
                                }, */
            /* pattern: {
              value:
                /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
              message:
                "латинские буквы, 1 заглавная, 8 символов, 1 спецсимвол, 1 цифра",
            }, */
          })}
          name="password"
          errors={errors}
          autoComplete="on"
          placeholder="Пароль"
        />
      </UserForm>
    </div>
  );
};

export default LogIn;
