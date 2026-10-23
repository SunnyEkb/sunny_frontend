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
import { ServiceInfo } from "../../../../common/model/ads";
import styles from "./listServices.module.scss";
import { useSearchItems } from "../../../../shared/hooks/useSearchItems";

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
              data ?? servicesAdapter.getInitialState(),
            ),
            next: data?.next,
            previous: data?.previous,
            count: data?.count,
          },
          ...originalArgs,
        };
      },
    },
  );
  const { debounceString, searchItems } = useSearchItems({
    isAdvertSearch: true,
    category: params.id,
  });

  React.useEffect(() => {
    if (isSuccess && inView && data.next) {
      dispatch(changePageAction(page + 1));
    }
  }, [isSuccess, inView, searchItems]);

  return (
    <React.Fragment>
      <div className={styles.listServices}>
        {Array.isArray(searchItems) &&
          searchItems.length === 0 &&
          debounceString.length > 2 && (
            <span className={styles.title}>Ничего не найдено</span>
          )}

        {Array.isArray(searchItems) &&
          searchItems.length > 0 &&
          debounceString.length > 2 && (
            <>
              {searchItems.map((item) => (
                <CardCatalog key={item.id} title={item.title} card={item} />
              ))}
            </>
          )}

        {debounceString.length <= 2 &&
          data.items.map((item: ServiceInfo) => {
            return <CardCatalog key={item.id} title={item.title} card={item} />;
          })}
        <div ref={ref} className={styles.observer_element} />
      </div>
    </React.Fragment>
  );
}
