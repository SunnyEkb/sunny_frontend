import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import UserForm from "../../components/form/userForm";
import {
  InputFieldConfig,
  passwordChangeFields,
} from "../../components/input/constans";
import LayoutUserLK from "../../layout/layoutUserLK/LayoutUserLK";
import { useForm } from "react-hook-form";
import passwordChangeValidationSchema, {
  FormValuesPasswordChange,
} from "./passwordChangeValidationSchema";
import { usePasswordChangeMutation } from "../../../store/auth-api/authApi";
import ButtonForm from "../../../shared/button/button";
import InputForm from "../../components/input/InputForm";

import styles from "./passwordChange.module.scss";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const PasswordChange = ({}) => {
  const [passwordChange] = usePasswordChangeMutation();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setError,
  } = useForm<FormValuesPasswordChange>({
    mode: "onChange",
    resolver: yupResolver(passwordChangeValidationSchema),
  });

  const onSubmit = async (data: FormValuesPasswordChange) => {
    try {
      const payload = {
        current_password: data.currentPassword,
        new_password: data.password,
        confirmation: data.confirmation,
      };

      await passwordChange(payload).unwrap();

      reset();
    } catch (err) {
      const e = err as FetchBaseQueryError;

      if (e?.status === 400) {
        setError("currentPassword", {
          message: "Неверный пароль",
        });
      }

      console.log("Ошибка", err);
    }
  };

  return (
    <LayoutUserLK title="Изменить пароль">
      <div className={styles.formWrapper}>
        <UserForm
          onSubmit={handleSubmit(onSubmit)}
          name="password-change"
        >
          {(
            passwordChangeFields as Array<
              InputFieldConfig & { name: keyof FormValuesPasswordChange }
            >
          ).map((field) => (
            <React.Fragment key={field.name}>
              <InputForm
                type={field.type}
                {...register(field.name)}
                name={field.name}
                placeholder={field.placeholder}
                inputTitle={
                  field.inputTitle === "Пароль"
                    ? "Новый пароль"
                    : field.inputTitle
                }
                errors={errors}
              />
              {!errors[field.name]?.message && (
                <span className={styles.description}>
                  От 8 до 20 знаков включая спецсимволы и цифры
                </span>
              )}
            </React.Fragment>
          ))}

          <ButtonForm
            type="submit"
            title="Сохранить новый пароль"
            disabled={!isValid}
            extraClass={styles.button}
          />
        </UserForm>
      </div>
    </LayoutUserLK>
  );
};

export default PasswordChange;
