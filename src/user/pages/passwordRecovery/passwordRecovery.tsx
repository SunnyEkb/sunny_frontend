/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect } from "react";
import styles from "./passwordRecovery.module.scss"
import AuthPageLayout from "../../layout/authPageLayout/AuthPageLayout";
import UserForm from "../../components/form/userForm";
import InputForm from "../../components/input/InputForm";
//import { inputFields, Inputs } from "./constans";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonForm from "../../../shared/button/button";
import emailValidationSchema from "./emailValidationSchema";
import { Inputs, passwordRecoveryFields } from "../../components/input/constans";


const PasswordRecovery: FC = () => {

  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    reset,
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: yupResolver<any>(emailValidationSchema),
  });

  const onSubmit = (data: Inputs) => {
    console.log(data)
  }

  useEffect(() => {
    const defaultValues: Inputs = {
      email: "",
    };
    reset(defaultValues);
  }, [reset]);

  return (
    <AuthPageLayout title="Восстановление пароля" onGoBack={() => navigate(-1)}>
        <UserForm
          name="passwordRecovery"
          onSubmit={handleSubmit(onSubmit)}
          isValid={isValid}
          isDirty={isDirty}
          title="Войти"
          //isLoading={isLoginLoading}
        >

          <p className={styles.passwordRecovery_article}>
            Введите электронную почту, которую использовали при регистрации.
            На указанный адрес будет отправлена ссылка для восстановления пароля.
          </p>

          {passwordRecoveryFields.map((field) => (
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

          <ButtonForm
            type="submit"
            disabled={!isValid || !isDirty /* || isLoginLoading */}
            title="Восстановить пароль"
          />

          <p className={styles.passwordRecovery_innerText}>
            Если письмо не приходит, проверьте папку «Спам» в своей почте.
          </p>
        </UserForm>
  </AuthPageLayout>

  )

}

export default PasswordRecovery
