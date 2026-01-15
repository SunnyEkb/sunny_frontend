import CardCatalog from "../../../ads/pages/catalog/CardCatalog/CardCatalog";
import { useGetFavoritesQuery } from "../../../store/entities/services/services";
import { CustomLoader } from "../../../shared/customLoader/customLoader";

import styles from "./UserFavorites.module.scss";

export const UserFavorites = () => {
  const { data: favorites, isLoading, isSuccess } = useGetFavoritesQuery();


  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Избранное</h1>

      {isLoading && <CustomLoader />}
      {!!favorites?.results.length && (
        <div>
          {favorites.results.map(({ subject }) => (
            <CardCatalog
              key={subject.id}
              title={subject.title}
              card={subject}
            />
          ))}
        </div>
      )}
      {(!favorites?.results.length && isSuccess) && <p className={styles.empty}>Пусто</p>}
    </main>
  );
};
