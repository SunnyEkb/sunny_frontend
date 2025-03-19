/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LogIn.module.scss";
import UserForm from "../../components/form/userForm";
import InputForm from "../../components/input/InputForm";
import ButtonForm from "../../../shared/button/button";
import {
  useLazyCheckAuthQuery,
  useLazyLoginQuery,
} from "../../../store/auth-api/authApi";
import { useDispatch } from "react-redux";
import { setAuthenticated, setUser } from "../../../store/slices/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import loginValidationSchema from "./loginValidationSchema";
//import { inputFields, Inputs } from "./constans";
import AuthPageLayout from "../../layout/authPageLayout/AuthPageLayout";
import { paths } from "../../../app/paths";
import { Inputs, loginFields } from "../../components/input/constans";

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
    resolver: yupResolver<any>(loginValidationSchema),
  });

  const [login, { isLoading: isLoginLoading }] = useLazyLoginQuery();
  const [fetcUserMe] = useLazyCheckAuthQuery();

  useEffect(() => {
    const defaultValues: Inputs = {
      password: "",
      email: "",
    };
    reset(defaultValues);
  }, [reset]);

  const [errMsg, setErrMsg] = useState("");

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
        navigate(paths.index);
      }
    } catch (err: any) {
      console.error("Ошибка при логине или запросе данных");
      err.data ? setErrMsg("Неправильная почта или пароль") : "";
    }
  };

  return (
    <AuthPageLayout
      title="Вход"
      onGoBack={() => {
        navigate(paths.index);
      }}
    >
      <div className={styles.LogIn_containerForm}>
        <UserForm
          name="registration"
          onSubmit={handleSubmit(onSubmit)}
          isValid={isValid}
          isDirty={isDirty}
          title="Войти"
          isLoading={isLoginLoading}
        >
          {loginFields.map((field) => (
            <InputForm
              key={field.name}
              type={field.type}
              {...register(field.name)}
              name={field.name}
              placeholder={field.placeholder}
              inputTitle={field.inputTitle}
              errors={errors}
            />
          ))}

          <Link
            to={paths.passwordRecovery}
            className={styles.LogIn_passwordRecovery}
          >
            Забыли пароль?
          </Link>

          <ButtonForm
            type="submit"
            disabled={!isValid || !isDirty || isLoginLoading}
            title="Войти"
          />
        </UserForm>

        <p className={styles.LogIn__error_mesage}>{errMsg}</p>
        <div className={styles.LogIn_linkRegistr}>
          <Link
            to={paths.register}
            className={styles.LogIn_linkRegistr_linkText}
          >
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </AuthPageLayout>
  );
};

export default LogIn;
