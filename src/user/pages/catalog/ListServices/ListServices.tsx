import React from "react";
import { useInView } from "react-intersection-observer";
import {
  servicesAdapter,
  servicesSelector,
  useGetServicesQuery,
} from "../../../../store/entities/services/services";
import CardCatalog from "../CardCatalog/CardCatalog";
import styles from "./styles.module.scss";

export default function ListServices() {
  const [page, setPage] = React.useState(1);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const { data, isSuccess } = useGetServicesQuery(
    {
      limit: 12,
      page: page,
    },
    {
      selectFromResult: ({ data, ...originalArgs }) => ({
        data: servicesSelector.selectAll(
          data ?? servicesAdapter.getInitialState()
        ),
        ...originalArgs,
      }),
    }
  );

  React.useEffect(() => {
    if (isSuccess && inView) {
      setPage((prev) => prev + 1);
    }
  }, [isSuccess, inView]);
  return (
    <React.Fragment>
      {data.map((item) => {
        return <CardCatalog key={item.id} title={item.title}/>;
      })}
      <div ref={ref} className={styles.observer_element} />
    </React.Fragment>
  );
}
