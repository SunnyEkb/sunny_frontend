import { useEffect, useState } from "react";
import { useSearch } from "../../app/layouts/SearchProvider/SearchProvider";
import {
  ISearchItem,
  useGetAdvertSearchItemsQuery,
  useGetSearchItemsQuery,
} from "../../store/entities/search/searchApi";
import { ServiceInfo } from "../../common/model/ads";

type SearchParams<T extends boolean> = {
  isAdvertSearch: T;
  category?: string;
  limit?: number;
  page?: number;
};

export const useSearchItems = <T extends boolean>({
  isAdvertSearch,
  category,
  limit,
  page,
}: SearchParams<T>) => {
  const [searchString] = useSearch();
  const [debounceString, setDebounceString] = useState(searchString);
  const {
    data: commonSearchResults,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useGetSearchItemsQuery(
    {
      searchString: debounceString,
      category,
    },
    {
      skip: debounceString?.length <= 2 || !debounceString || isAdvertSearch,
    },
  );

  const {
    data: advertSearchResults,
    isLoading: isAdvertsLoading,
    isError: isAdvertsError,
  } = useGetAdvertSearchItemsQuery(
    {
      searchString: debounceString,
      category_id: category || "",
      limit: limit || 12,
      page: page || 1,
    },
    {
      skip: debounceString?.length <= 2 || !debounceString || !isAdvertSearch,
    },
  );

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceString(searchString);
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchString]);


  const searchItems = (isAdvertSearch
    ? advertSearchResults?.items
    : commonSearchResults) as T extends true ? ServiceInfo[] | undefined : ISearchItem[] | undefined;

  return {
    searchString,
    debounceString,
    searchItems,
    isLoading: isAdvertSearch ? isAdvertsLoading : isSearchLoading,
    isError: isAdvertSearch ? isAdvertsError : isSearchError,
  };
};
