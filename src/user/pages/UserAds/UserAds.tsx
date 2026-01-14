import { useGetUserAdvertisementsQuery } from "../../../store/entities/services/services";
import { AdCard } from "./AdCard/AdCard";
import { Tabs } from "./Tabs/Tabs";

import styles from "./UserAds.module.scss";

export const UserAds = ({}) => {
  const { data, isLoading: isDataLoading } = useGetUserAdvertisementsQuery();

  const Loading = <p>Загрузка...</p>;
  const Empty = <p>Пусто</p>;

  const ServicesCards = data?.results?.length
    ? data.results
        .filter((item) => item.type === "service")
        .map((service) => (
          <AdCard
            key={service.id}
            title={service.title}
            image={service.title_photo ? service.title_photo.image! : undefined}
            price={1000}
            description={service.description}
          />
        ))
    : Empty;

  const AdsCards = data?.results?.length
    ? data.results
        .filter((item) => item.type === "ad")
        .map((ad) => (
          <AdCard
            key={ad.id}
            title={ad.title}
            image={ad.title_photo ? ad.title_photo.image! : undefined}
            price={1000}
            description={ad.description}
          />
        ))
    : Empty;

  const tabsData: { title: string; content: React.ReactNode }[] = [
    {
      title: "Объявления",
      content: isDataLoading ? Loading : ServicesCards,
    },
    {
      title: "Услуги",
      content: isDataLoading ? Loading : AdsCards,
    },
  ];

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Мои объявления</h1>
      <Tabs tabsData={tabsData} />
    </main>
  );
};
