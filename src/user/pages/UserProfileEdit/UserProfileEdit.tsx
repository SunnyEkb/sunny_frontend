/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react";
import styles from "./userProfileEdit.module.scss";
import LayoutUserLK from "../../layout/layoutUserLK/LayoutUserLK";
import {
  useLazyCheckAuthQuery,
  useUpdateUserAvatarMutation,
  useUpdateUserProfileMutation,
} from "../../../store/auth-api/authApi";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/slices/authSlice";
import { useAppSelector } from "../../../store/store";
import ButtonForm from "../../../shared/button/button";
import Avatar from "../../components/avatar/Avatar";
import UserForm from "../../components/form/userForm";
import InputForm from "../../components/input/InputForm";
import { inputFields, UserProfileFormInputs } from "./constans";
import React from "react";

const UserProfileEdit: FC = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setValue,
    getValues,
    reset,
  } = useForm<UserProfileFormInputs>({
    mode: "onChange",
  });

  // Достаем данные пользователя из Redux
  const userProfile = useAppSelector((state) => state.auth.user);

  // Запрос для получения данных пользователя
  const [fetchUserMe] = useLazyCheckAuthQuery();

  // для обновления профиля пользователя
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  const [updateAvatar] = useUpdateUserAvatarMutation();

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
        dispatch(setUser(user)); // Сохраняем данные пользователя в Redux
      } catch (err) {
        console.error("Ошибка при загрузке данных пользователя:", err);
      }
    };

    loadUserData();
  }, [dispatch, fetchUserMe]);

  const avatarUrl = getValues("avatar");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: UserProfileFormInputs) => {
    if (userProfile?.id) {
      try {
        const res = await updateProfile(data).unwrap();
        dispatch(setUser(res.data));
        reset(data); // Сбрасываем форму после успешного обновления данных
      } catch (error: any) {
        if (error?.data) {
          // Выводим ошибки в консоль для каждого поля
          Object.entries(error.data).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              messages.forEach((message) => {
                console.error(`Ошибка в поле ${field}: ${message}`);
                setErrorMessage(message);
              });
            }
          });
        } else {
          console.error("Ошибка при обновлении профиля:", error);
        }
      }
    } else {
      console.error("Ошибка при обновлении профиля:");
      reset(data);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        console.error("Выберите изображение");
        return;
      }

      try {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const base64String = event.target && (event.target.result as string);
          await updateAvatar({ avatar: base64String, id: userProfile?.id });
        };
        await reader.readAsDataURL(file);

        setValue("avatar", file, { shouldDirty: true, shouldTouch: true });
      } catch (e) {
        console.warn("аватар не загрузился");
      }
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
          {inputFields.map((field) => (
            <InputForm
              key={field.name}
              type={field.type}
              {...register(field.name, field.validation)}
              name={field.name}
              placeholder={field.placeholder}
              inputTitle={field.inputTitle}
              errors={errors}
            />
          ))}

          <div className={styles.futerform}>
            {errorMessage && (
              <div className={styles.errorMessage}>
                <p className={styles.errorMessage__text}>{errorMessage}</p>
              </div>
            )}
            <ButtonForm
              type="submit"
              disabled={isUpdating || !isDirty}
              title={isUpdating ? "Сохранение..." : "Сохранить изменения"}
            />
          </div>
        </UserForm>
      </article>
    </LayoutUserLK>
  );
};

export default UserProfileEdit;
