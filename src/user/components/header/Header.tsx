import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLazyCheckAuthQuery, useLogoutMutation } from '../../../store/auth-api/authApi'; // update the import path as needed
import styles from './header.module.scss';
import { paths } from '../../../app/paths';

interface SearchFormProps {
  search: string;
}

export default function Header() {
  const { register, handleSubmit, formState: { errors } } = useForm<SearchFormProps>();
  const navigate = useNavigate();
  const [trigger, { data: user, isLoading }] = useLazyCheckAuthQuery();
  const [logout, { isSuccess }] = useLogoutMutation();

  const onSubmit = (data: SearchFormProps) => {
    console.log(data);
  };

  const handleLogout = async () => {
    await logout();
    if (isSuccess) {
      navigate(paths.index);
    }
  };

  // Trigger the checkAuth query to determine if the user is logged in
  if (!isLoading && !user) {
    trigger();
  }

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <h1 className={styles.logo}>Солнечный Екб</h1>
        {user ? (
          <button className={styles.authButton} onClick={handleLogout}>Выйти</button>
        ) : (
          <button className={styles.authButton} onClick={() => navigate(paths.auth)}>Вход и регистрация</button>
        )}
      </div>
      <div className={styles.bottomRow}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
            <input
              {...register('search', {
                required: 'Введите название услуги',
                minLength: {
                  value: 2,
                  message: 'Минимум два символа',
                },
                maxLength: {
                  value: 40,
                  message: 'Максимум сорок символов',
                },
              })}
              type="text"
              placeholder="Поиск услуги"
              className={styles.searchInput}
            />
            {errors.search && <p className={styles.error}>{errors.search.message}</p>}
          </div>
        </form>
        <button type="button" className={styles.createButton} onClick={() => navigate(paths.createAds)}>Создать объявление</button>
      </div>
    </header>
  );
}
