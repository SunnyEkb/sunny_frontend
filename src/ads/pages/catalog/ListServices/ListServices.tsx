import React from "react";
import { useInView } from "react-intersection-observer";
import {
  servicesAdapter,
  servicesSelector,
  useGetServicesQuery,
} from "../../../../store/entities/services/services";
import CardCatalog from "../CardCatalog/CardCatalog";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { changePageAction } from "../../../../store/slices/serviceSlice";
import { useParams } from "react-router-dom";

export default function ListServices() {
  const dispatch = useAppDispatch();
  const { page, search } = useAppSelector((state) => state.services);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const params = useParams();

  const { data, isSuccess } = useGetServicesQuery(
    {
      limit: 12,
      page: page,
      search: search,
      typeId: params.id!
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
      dispatch(changePageAction(page + 1));
    }
  }, [isSuccess, inView]);

  return (
    <React.Fragment>
      {data.map((item) => {
        return <CardCatalog key={item.id} title={item.title} />;
      })}
      <div ref={ref} className={styles.observer_element} />
    </React.Fragment>
  );
}
