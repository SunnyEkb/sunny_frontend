/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./LogIn.scss";
import UserForm from "../../components/form/userForm";
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
            required: "Напишите ваш лоин или email",
            /* pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
              message: "Некорректный формат почты",
            }, */
          })}
          name="email"
          errors={errors}
          placeholder=""
          inputTitle="Логин или email"
        />

        <InputForm
          type="password"
          {...register("password", {
            required: "Введите пароль",
          })}
          name="password"
          errors={errors}
          autoComplete="on"
          placeholder=""
          inputTitle="Пароль"
        />
      </UserForm>
    </div>
  );
};

export default LogIn;

