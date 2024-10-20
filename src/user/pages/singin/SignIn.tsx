/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SingIn.module.scss";
import UserForm from "../../components/form/userForm";
import InputForm from "../../components/input/InputForm";
import { useRegisterMutation } from "../../../store/auth-api/authApi";
import ButtonForm from "../../../shared/button/button";
import checkmark from "../../../assets/icon/checkmark.svg";
import { phoneMask } from "../../../utils/phoneMask";
import { yupResolver } from "@hookform/resolvers/yup";
import signInValidationSchema from "./signInValidationSchema";

export interface Inputs {
  username: string;
  phone: string;
  password: string;
  confirmation: string;
  email: string;
}

const Registr: FC = () => {

  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    reset,
    watch,
    setError,
    setValue,
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: yupResolver(signInValidationSchema)
  });

  // отправляем запрос на регистрацию пользователя
  const [registerUser, { error, isLoading, data: userData }] =
    useRegisterMutation();

  const title = "Регистрация";

  useEffect(() => {
    const defaultValues: Inputs = {
      username: "",
      phone: "",
      password: "",
      confirmation: "",
      email: "",
    };
    reset(defaultValues);
  }, [reset]);

  const [checked, setChecked] = useState(false);

  const toggleBtn = () => {
		setChecked((prev) => !prev);
	};

  const onSubmit = async (data: Inputs) => {
    try {
      await registerUser(data).unwrap()
        .then(() => {
          navigate("/auth");
        })
    } catch (error: any) {
      if (error.data) {
        const serverErrors = error.data;
        if (serverErrors.username) {
          setError("username", {
            type: "server",
            message: serverErrors.username[0],
          });
        }
        if (serverErrors.email) {
          setError("email", {
            type: "server",
            message: serverErrors.email[0],
          });
        }
      }
    }
  };

  const password = watch("password");

  const phoneNumber = watch("phone") || "";

  useEffect(() => {
    const maskedPhone = phoneMask(phoneNumber);
    if (phoneNumber !== maskedPhone) {
      setValue("phone", phoneMask(phoneNumber));
    }
  }, [phoneNumber, setValue])

  return (
    <div className={styles.Registr}>
    <div className={styles.Registr_containerTitle}>
      <h2 className={styles.Registr_title}>{title}</h2>
    </div>

    <UserForm
      name="registration"
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
      isDirty={isDirty}
      isLoading={isLoading}
      title={title}
    >
      <InputForm
        type="text"
        {...register("username")}
        name="username"
        placeholder=""
        inputTitle="Имя"
        errors={errors}
      />

      <InputForm
        type="text"
        {...register("email")}
        name="email"
        errors={errors}
        placeholder=""
        inputTitle="Электронная почта"
      />

      <InputForm
        type="text"
        {...register("phone")}
        name="phone"
        errors={errors}
        placeholder="+7"
        inputTitle="Телефон"
      />

      <InputForm
        type="password"
        {...register("password")}
        name="password"
        errors={errors}
        autoComplete="on"
        placeholder=""
        inputTitle="Пароль"
      />

      <InputForm
        type="password"
        {...register("confirmation")}
        name="confirmation"
        errors={errors}
        autoComplete="on"
        placeholder=""
        inputTitle="Повторите пароль"
      />

      <div>
        <div className={styles.checkboxContainer}>
          <button
            className={`${styles.checkbox} ${
              checked && styles.checkboxChecked
            }`}
            type="button"
            aria-label="savePw"
            onClick={toggleBtn}
          >
            {checked && <img src={checkmark} alt="checkmark" />}
          </button>
          <p>
            Я даю согласие на обработку персональных данных в соответствии
            с&nbsp;
            <Link to={{ pathname: "/policy" }}>
              Политикой конфиденциальности
            </Link>
            &nbsp; и принимаю&nbsp;
            <Link to={{ pathname: "/policy" }}>Условия работы сервиса</Link>.
          </p>
        </div>
      </div>

      <ButtonForm
        type="submit"
        disabled={!isValid || !isDirty || isLoading || !checked}
        title={title || "Ввод"}
      />
    </UserForm>
  </div>
);
};


export default Registr;
