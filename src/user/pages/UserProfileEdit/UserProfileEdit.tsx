/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react";
import styles from "./userProfileEdit.module.scss";
import LayoutUserLK from "../../layout/layoutUserLK/LayoutUserLK";
import {
  useLazyCheckAuthQuery,
  useUpdateUserProfileMutation,
} from "../../../store/auth-api/authApi";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { setUser } from "../../../store/slices/authSlice";
import { useAppSelector } from "../../../store/store";
import ButtonForm from "../../../shared/button/button";
import Avatar from "../../components/avatar/Avatar";
//import avatarUrl from "../../../assets/kapibara-avatar-mock.jpg";
import UserForm from "../../components/form/userForm";
import InputForm from "../../components/input/InputForm";

interface UserProfileFormInputs {
  id: number;
  username?: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string;
  phone?: string;
  password?: string;
  avatar?: File | string | null;
}

const UserProfileEdit: FC = () => {
  const dispatch = useDispatch();

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);


  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<UserProfileFormInputs>({
    mode: "onChange",
  });

  // Достаем данные пользователя из Redux
  const userProfile = useAppSelector((state) => state.auth.user);

  // Запрос для получения данных пользователя
  const [fetchUserMe, { isLoading: isLoadingUserData }] =
    useLazyCheckAuthQuery();

  // для обновления профиля пользователя
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  // Заполняем форму при получении данных пользователя
  useEffect(() => {
    if (userProfile) {
      reset({
        id: userProfile.id,
        username: userProfile.username,
        first_name: userProfile.first_name,
        last_name: userProfile.last_name,
        email: userProfile.email,
        phone: userProfile.phone,
        avatar: userProfile?.avatar,
      });
    } else {
      fetchUserMe();
    }
  }, [userProfile, reset, fetchUserMe]);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = await fetchUserMe().unwrap();
        //console.log(user)
        dispatch(setUser(user)); // Сохраняем данные пользователя в Redux
      } catch (err) {
        console.error("Ошибка при загрузке данных пользователя:", err);
      }
    };

    loadUserData();
  }, [dispatch, fetchUserMe]);

  const onSubmit = async (data: UserProfileFormInputs) => {
    if (userProfile?.id) {
      await updateProfile(data)
      .then((res) => {
        console.log(res.data)
        dispatch(setUser(res.data));
      })
    } else {
      console.error("Ошибка при обновлении профиля:");
    }

  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file)
    }
  };


  const initial = userProfile?.username
    ? userProfile.username.charAt(0).toUpperCase()
    : "";

  return (
    <LayoutUserLK title="Мой профиль">
      <article className={styles.userLK}>
        <Avatar
          avatarUrl={avatarUrl}
          initial={initial}
          altText={`${name}`}
          editable={true}
          onAvatarChange={handleAvatarChange}
        />
        <UserForm
          name="registration"
          onSubmit={handleSubmit(onSubmit)}
          isValid={isValid}
          isDirty={isDirty}
          isLoading={isUpdating}
        >
          <InputForm
            type="text"
            {...register("username", {
              //required: "Напишите ваше имя",
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
              //required: "Напишите ваш email",
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
              //required: "Напишите ваш телефон",
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
          <ButtonForm
            type="submit"
            disabled={isUpdating  || !isDirty}
            title={isUpdating ? "Сохранение..." : "Сохранить изменения"}
          />
        </UserForm>
      </article>
    </LayoutUserLK>
  );
};

export default UserProfileEdit;


{/* <InputForm
            type="text"
            {...register("last_name", {
              //required: "Напишите ваше имя",
              minLength: {
                value: 2,
                message: "Минимум два символа",
              },
              maxLength: {
                value: 40,
                message: "Максимум сорок символов",
              },
            })}
            name="last_name"
            placeholder=""
            inputTitle="Фамилия"
            errors={errors}
          /> */}


          {/* <InputForm
            type="password"
            {...register("password", {
              //required: "Придумайте пароль",
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
          /> */}

