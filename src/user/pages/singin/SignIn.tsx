/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./SingIn.scss";
import UserForm from "../../components/form/UserForm";
import InputForm from "../../components/input/InputForm";

interface Inputs {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

const SignIn: FC = () => {
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    reset,
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const title = "Регистрация";

  useEffect(() => {
    const defaultValues: Inputs = {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
    };
    reset(defaultValues);
  }, [reset]);

  const onSubmit = (data: Inputs) => {
    console.log(data);
  };

  return (
    <div className="SingIn">
      <h2>{title}</h2>
      <UserForm
        name="registration"
        onSubmit={handleSubmit(onSubmit)}
        isValid={isValid}
        isDirty={isDirty}
        title={title}
      >
        <InputForm
          type="text"
          {...register("firstName", {
            required: "Напишите ваше имя",
            minLength: {
              value: 2,
              message: "Минимум два символа",
            },
            maxLength: {
              value: 40,
              message: "Максимум сорок символов",
            },
          })}
          name="firstName"
          placeholder="имя"
          errors={errors}
        />
        <InputForm
          type="text"
          {...register("lastName", {
            required: "Заполните это поле",
            minLength: {
              value: 2,
              message: "Минимум два символа",
            },
            maxLength: {
              value: 40,
              message: "Максимум сорок символов",
            },
          })}
          name="lastName"
          errors={errors}
          placeholder="фамилия"
        />

        <InputForm
          type="text"
          {...register("email", {
            required: "Напишите ваш email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
              message: "Некорректный формат почты",
            },
          })}
          name="email"
          errors={errors}
          placeholder="Электронная почта"
        />

        <InputForm
          type="password"
          {...register("password", {
            required: "Придумайте пароль",
            pattern: {
              value:
                /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
              message:
                "латинские буквы, 1 заглавная, 8 символов, 1 спецсимвол, 1 цифра",
            },
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

export default SignIn;
