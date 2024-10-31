/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LogIn.module.scss";
import UserForm from "../../components/form/userForm";
import InputForm from "../../components/input/InputForm";
import ButtonForm from "../../../shared/button/button";
import {
  useLazyCheckAuthQuery,
  useLazyLoginQuery,
  useLazyRefrechTokenQuery,
} from "../../../store/auth-api/authApi";
//import { setAuthenticated } from '../../../store/slices/authSlice';
import { useDispatch } from "react-redux";
import { setAuthenticated, setUser } from "../../../store/slices/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import loginValidationSchema from "./loginValidationSchema";
import PageTitle from "../../../shared/pageTitle/pageTitle";
import CrossCloseButton from "../../../shared/crossCloseButton/crossCloseButton";

interface Inputs {
  password: string;
  email: string;
}

const LogIn: FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    reset,
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: yupResolver(loginValidationSchema),
  });

  const [login, { isLoading: isLoginLoading }] = useLazyLoginQuery();
  const [fetcUserMe] = useLazyCheckAuthQuery();
  const [refrechToken] = useLazyRefrechTokenQuery();

  useEffect(() => {
    const defaultValues: Inputs = {
      password: "",
      email: "",
    };
    reset(defaultValues);
  }, [reset]);
  const handleGoBack = () => navigate(-1);

  const onSubmit = async (data: Inputs) => {
    try {
      // Выполняем запрос логина
      const loginResponse = await login(data).unwrap();
      if (loginResponse) {
        // Если логин успешен, запрашиваем рефреш токен
        //пока рефреш не запрашиваем
        //await refrechToken().unwrap();

        // Получаем данные пользователя
        const userResponse = await fetcUserMe().unwrap();
        dispatch(setUser(userResponse));
        dispatch(setAuthenticated(true));

        // Перенаправляем на страницу каталога
        navigate("/");
      }
    } catch (err) {
      console.error("Ошибка при логине или запросе данных:", err);
    }
  };

  return (
    <div className={styles.LogIn}>
      <div className={styles.containerCloseButton}>
        <CrossCloseButton onClick={handleGoBack} />
      </div>

      <div className={styles.LogIn_containerTitle}>
        <PageTitle title="Вход" />
      </div>
      <div className={styles.LogIn_containerForm}>
        <UserForm
          name="registration"
          onSubmit={handleSubmit(onSubmit)}
          isValid={isValid}
          isDirty={isDirty}
          title="Войти"
          isLoading={isLoginLoading}
        >
          <InputForm
            type="text"
            {...register("email")}
            name="email"
            errors={errors}
            placeholder=""
            inputTitle="email"
          />
          <InputForm
            type="password"
            {...register("password")}
            name="password"
            errors={errors}
            placeholder=""
            inputTitle="Пароль"
          />
          <ButtonForm
            type="submit"
            disabled={!isValid || !isDirty || isLoginLoading}
            title="Войти"
          />
        </UserForm>
        <div className={styles.LogIn_linkRegistr}>
          <Link
            to={{ pathname: "/register" }}
            className={styles.LogIn_linkRegistr_linkText}
          >
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
