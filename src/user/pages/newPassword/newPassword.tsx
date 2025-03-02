import React, { FC, useState } from "react";
import styles from "./newPassword.module.scss";
import { Inputs, newPasswordFields } from "../../components/input/constans";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import newPasswordValidationSchema, {
  FormValuesNewPassword,
} from "./passwordValidationSchema";
import AuthPageLayout from "../../layout/authPageLayout/AuthPageLayout";
import UserForm from "../../components/form/userForm";
import InputForm from "../../components/input/InputForm";
import ButtonForm from "../../../shared/button/button";
import { usePasswordForgetMutation } from "../../../store/auth-api/authApi";
import { paths } from "../../../app/paths";

const NewPassword: FC = () => {
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  const goToPage = (path: string) => {
    navigate(path);
  };

  React.useEffect(() => {
    if (!token) {
      goToPage(paths.index);
    }
  }, [token]);

  const defaultValues: FormValuesNewPassword = {
    password: "",
    confirmation: "",
  };

  const [changePassword] = usePasswordForgetMutation();

  const [errMsg, setErrMsg] = useState<string | null>(null);

  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
  } = useForm<FormValuesNewPassword>({
    mode: "onChange",
    resolver: yupResolver(newPasswordValidationSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: Inputs) => {
    token &&
      (await changePassword({ password: data.password, token: token })
        .unwrap()
        .then(() => {
          goToPage(paths.auth);
        })
        .catch((e) => {
          console.error(e);
          e.data ? setErrMsg("Возникла ошибка и пароль не изменён") : null;
        }));
  };

  return (
    <AuthPageLayout title="Новый пароль" onGoBack={() => goToPage(paths.index)}>
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...register(field.name as any)}
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

      {errMsg && <p className={styles.errorText}>{errMsg}</p>}
    </AuthPageLayout>
  );
};

export default NewPassword;
