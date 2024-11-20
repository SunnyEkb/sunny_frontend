/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react"
import { Inputs, newPasswordFields } from "../../components/input/constans";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import newPasswordValidationSchema from "./passwordValidationSchema";
import AuthPageLayout from "../../layout/authPageLayout/AuthPageLayout";
import UserForm from "../../components/form/userForm";
import InputForm from "../../components/input/InputForm";
import ButtonForm from "../../../shared/button/button";

const NewPassword:FC = () => {

  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    reset,
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: yupResolver<any>(newPasswordValidationSchema),
  });

  const onSubmit = (data: Inputs) => {
    console.log(data)
  }

  useEffect(() => {
    const defaultValues: Inputs = {
      password: "",
      confirmation: "",
    };
    reset(defaultValues);
  }, [reset]);

  return (
    <AuthPageLayout title="Новый пароль" onGoBack={() => navigate(-1)}>
        <UserForm
          name="newPassword"
          onSubmit={handleSubmit(onSubmit)}
          isValid={isValid}
          isDirty={isDirty}
          title="Новый пароль"
          //isLoading={isLoginLoading}
        >

          {newPasswordFields.map((field) => (
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
            disabled={!isValid /* || !isDirty */ /* || isLoginLoading */}
            title="Сохранить"
          />

        </UserForm>
  </AuthPageLayout>
  )
}

export default NewPassword;
