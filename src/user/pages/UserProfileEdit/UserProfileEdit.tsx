/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect } from "react";
import styles from "./userProfileEdit.module.scss"
import LayoutUserLK from "../../layout/layoutUserLK/LayoutUserLK";
import { useCheckAuthQuery, useUpdateUserProfileMutation } from "../../../store/auth-api/authApi";
import { useForm } from "react-hook-form";

interface UserProfileFormInputs {
  name: string;
  email: string;
  phone: string;
  password?: string;
}

const UserProfileEdit: FC = () => {

  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<UserProfileFormInputs>({
    mode: 'onChange'
  });

  const { data: userData, isLoading: isLoadingUserData } = useCheckAuthQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateUserProfileMutation();

  // Заполняем форму, когда данные профиля загружены
  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name,
        email: userData.email,
        phone: userData.phone
      });
    }
  }, [userData, reset]);

  const onSubmit = async (data: UserProfileFormInputs) => {
    await updateProfile(data);
  };


  return (
    <LayoutUserLK title="Мой профиль">
      <article className={styles.userLK}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.userProfileForm}>
      <div className={styles.avatar}>
        <img src={userData?.avatarUrl || '/default-avatar.png'} alt="User Avatar" className={styles.avatarImage} />
        <button type="button" className={styles.changeAvatarButton}>Изменить фото</button>
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="name">Имя пользователя</label>
        <input
          id="name"
          type="text"
          {...register('name', { required: 'Имя обязательно' })}
        />
        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="email">Электронная почта</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Электронная почта обязательна',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Введите корректный email'
            }
          })}
        />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="phone">Телефон</label>
        <input
          id="phone"
          type="tel"
          {...register('phone', { required: 'Телефон обязателен' })}
        />
        {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="password">Новый пароль</label>
        <input
          id="password"
          type="password"
          {...register('password', {
            minLength: {
              value: 6,
              message: 'Пароль должен быть не менее 6 символов'
            }
          })}
        />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
      </div>

      <button type="submit" className={styles.submitButton} disabled={!isValid || isUpdating}>
        {isUpdating ? 'Сохранение...' : 'Сохранить изменения'}
      </button>
    </form>
      </article>
    </LayoutUserLK>
  );
};

export default UserProfileEdit;
