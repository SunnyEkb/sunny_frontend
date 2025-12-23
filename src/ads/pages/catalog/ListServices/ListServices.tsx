import React from "react";
import { useInView } from "react-intersection-observer";
import {
  servicesAdapter,
  servicesSelector,
  useGetServicesQuery,
} from "../../../../store/entities/services/services";
import CardCatalog from "../CardCatalog/CardCatalog";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { changePageAction } from "../../../../store/slices/serviceSlice";
import { useParams } from "react-router-dom";
import { AdsInfo } from "../../../../common/model/ads";
import styles from "./listServices.module.scss";

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
      catalogId: params.id!,
    },
    {
      selectFromResult: ({ data, ...originalArgs }) => {
        return {
          data: {
            items: servicesSelector.selectAll(
              data ?? servicesAdapter.getInitialState()
            ),
            next: data?.next,
            previous: data?.previous,
            count: data?.count,
          },
          ...originalArgs,
        };
      },
    }
  );


  React.useEffect(() => {
    if (isSuccess && inView && data.next) {
      dispatch(changePageAction(page + 1));
    }
  }, [isSuccess, inView]);

  return (
    <React.Fragment>
      <div className={styles.listServices}>
        {data.items.map((item: AdsInfo) => {
          return <CardCatalog key={item.id} title={item.title} card={item} />;
        })}
        <div ref={ref} className={styles.observer_element} />
      </div>
    </React.Fragment>
  );
}
