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
      await registerUser(data)
        .unwrap()
        .then(() => {
          navigate("/auth");
        });
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
  }, [phoneNumber, setValue]);

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
          {...register("username", {
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
          name="username"
          placeholder=""
          inputTitle="Имя"
          errors={errors}
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
          placeholder=""
          inputTitle="Электронная почта"
        />

        <InputForm
          type="text"
          {...register("phone", {
            required: "Напишите ваш телефон",
            pattern: {
              value: /^((\+7|7|8)+([0-9]){10})$/,
              message:
                "Некорректный формат телефона. Начните с +7, 7 или 8 и введите 10 цифр после.",
            },
          })}
          name="phone"
          errors={errors}
          placeholder="+7"
          inputTitle="Телефон"
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
          placeholder=""
          inputTitle="Пароль"
        />

        <InputForm
          type="password"
          {...register("confirmation", {
            required: "Повторите пароль",
            validate: (value) => value === password || "Пароли не совпадают",
          })}
          name="confirmation"
          errors={errors}
          autoComplete="on"
          placeholder=""
          inputTitle="Повторите пароль"
        />

        <div className={styles.concestContainer}>
          <div className={styles.checkboxContainer}>

            <span
              className={`${styles.castomCeckbox} ${checked ? styles.checked : null}`}
              onClick={toggleBtn}
              tabIndex={0}
              role="checkbox"
              onKeyDown={(e) => {
                if (e.key === 'Enter') toggleBtn();
              }}
            ></span>
            <label htmlFor="consent" className={styles.concestText}>
              Я даю согласие на обработку персональных данных в соответствии
              с&nbsp;
              <Link to="/policy" className={styles.concestText__link}>
                Политикой конфиденциальности
              </Link>
              &nbsp; и принимаю&nbsp;
              <Link to="/policy" className={styles.concestText__link}>
                Условия работы сервиса
              </Link>
              .
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid || !isDirty || isLoading || !checked}
          className={styles.buttonReg}
        >
          Зарегистрироваться
        </button>
      </UserForm>
    </div>
  );
};

export default Registr;

{
  /* <button
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
          <p className={styles.concestText}>
            Я даю согласие на обработку персональных данных в соответствии
            с&nbsp;
            <Link to={{ pathname: "/policy" }} className={styles.concestText__link}>
              Политикой конфиденциальности
            </Link>
            &nbsp; и принимаю&nbsp;
            <Link to={{ pathname: "/policy" }} className={styles.concestText__link}>Условия работы сервиса</Link>.
          </p> */
}
{/* <input
              type="checkbox"
              id="consent"
              className={styles.checkbox}
              checked={checked}
              onChange={toggleBtn}
            /> */}
