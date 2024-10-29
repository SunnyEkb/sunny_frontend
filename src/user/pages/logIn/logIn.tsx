/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LogIn.module.scss";
import UserForm from "../../components/form/userForm";
import InputForm from "../../components/input/InputForm";
import ButtonForm from "../../../shared/button/button";
import { useLazyLoginQuery } from "../../../store/auth-api/authApi";
import { setAuthenticated } from '../../../store/slices/authSlice';
import { useDispatch } from "react-redux";

interface Inputs {
  password?: string;
  email?: string;
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
  });

  const [login, { error, isLoading, isSuccess }] = useLazyLoginQuery();

  useEffect(() => {
    const defaultValues: Inputs = {
      password: "",
      email: "",
    };
    reset(defaultValues);
  }, [reset]);

  const onSubmit = async (data: Inputs) => {
    login(data)
      .then((res) => {
        navigate("/");
      })
  };

  const title = "Войти"
  //const titleButtomVC = "продолжить через VC"

  return (
    <div className={styles.LogIn}>
      <div className={styles.LogIn_containerForm}>
        <UserForm
          name="registration"
          onSubmit={handleSubmit(onSubmit)}
          isValid={isValid}
          isDirty={isDirty}
          title={title}
          isLoading={isLoading}
        >
          <InputForm
            type="text"
            {...register("email", {
              required: "Напишите ваш логин или email",
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
            placeholder=""
            inputTitle="Пароль"
          />
          <ButtonForm
            type="submit"
            disabled={!isValid || !isDirty || isLoading}
            title={title || "VC"}
          />
        </UserForm>
        <div className={styles.LogIn_linkRegistr}>
          <Link
            to={{ pathname: "/register" }}
            className={styles.LogIn_linkRegistr_linkText}
          >
            Регистрация
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

