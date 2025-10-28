import {
  useGetUserServicesQuery,
  useGetUserAdsQuery,
} from "../../../store/entities/services/services";
import { AdCard } from "./AdCard/AdCard";
import { Tabs } from "./Tabs/Tabs";

import styles from "./UserAds.module.scss";

export const UserAds = ({}) => {
  const { data: services, isLoading: isServicesLoading } =
    useGetUserServicesQuery();
  const { data: ads, isLoading: isAdsLoading } = useGetUserAdsQuery();

  const Loading = <p>Загрузка...</p>;
  const Empty = <p>Пусто</p>;

  const ServicesCards = services?.results?.length
    ? services.results.map((service) => (
        <AdCard
          key={service.id}
          title={service.title}
          image={service.images[0]?.image}
          price={1000}
          description={service.description}
        />
      ))
    : Empty;

  const AdsCards = ads?.results?.length
    ? ads.results.map((ad) => (
        <AdCard
          key={ad.id}
          title={ad.title}
          image={ad.images[0]?.image}
          price={1000}
          description={ad.description}
        />
      ))
    : Empty;

  const tabsData: { title: string; content: React.ReactNode }[] = [
    {
      title: "Объявления",
      content: isServicesLoading ? Loading : ServicesCards,
    },
    {
      title: "Услуги",
      content: isAdsLoading ? Loading : AdsCards,
    },
  ];

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Мои объявления</h1>
      <Tabs tabsData={tabsData} />
    </main>
  );
};
