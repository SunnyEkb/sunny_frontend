/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./SingIn.module.scss";
import UserForm from "../../components/form/userForm";
import InputForm from "../../components/input/InputForm";
import { useRegisterMutation } from "../../../store/auth-api/authApi";
import { phoneMask } from "../../../utils/phoneMask";
import { yupResolver } from "@hookform/resolvers/yup";
import signInValidationSchema from "./signInValidationSchema";
import CheckboxContainer from "../../components/checkboxContainer/checkboxContainer";
//import { inputFields, Inputs } from "./constans";
import AuthPageLayout from "../../layout/authPageLayout/AuthPageLayout";
import { Inputs, registerFields } from "../../components/input/constans";
import { paths } from "../../../app/paths";
import { useDispatch } from "react-redux";
import { setRegistrated, setUser, User } from "../../../store/slices/authSlice";

const Registr: FC = () => {
  const navigate = useNavigate();
   const dispatch = useDispatch();

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
    resolver: yupResolver<any>(signInValidationSchema),
  });

  // отправляем запрос на регистрацию пользователя
  const [registerUser, { isLoading }] =
    useRegisterMutation();

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
      const user = await registerUser(data).unwrap();
      dispatch(setRegistrated(user));
      navigate(paths.confirmEmail);
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

  const phoneNumber = watch("phone") || "";

  useEffect(() => {
    const maskedPhone = phoneMask(phoneNumber);
    if (phoneNumber !== maskedPhone) {
      setValue("phone", phoneMask(phoneNumber));
    }
  }, [phoneNumber, setValue]);

  return (
    <AuthPageLayout title="Регистрация" onGoBack={() => navigate(-1)}>
      <UserForm
        name="registration"
        onSubmit={handleSubmit(onSubmit)}
        isValid={isValid}
        isDirty={isDirty}
        isLoading={isLoading}
        title="Регистрация"
      >

       {/*  {inputFields.map((field) => ( */}
        {registerFields.map((field) => (
          <InputForm
            key={field.name}
            type={field.type}
            {...register(field.name)}
            name={field.name}
            placeholder={field.placeholder}
            inputTitle={field.inputTitle}
            errors={errors}
            autoComplete={field.autoComplete}
          />
        ))}

        <div className={styles.concestContainer}>
          <CheckboxContainer checked={checked} onToggle={toggleBtn} />
        </div>

        <button
          type="submit"
          disabled={!isValid || !isDirty || isLoading || !checked}
          className={styles.buttonReg}
        >
          Зарегистрироваться
        </button>
      </UserForm>
    </AuthPageLayout>
  );
};

export default Registr;
