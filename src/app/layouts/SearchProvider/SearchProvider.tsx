import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface ISearchContext {
  searchString: string;
  handleSearchItems: (value: string) => void;
}

const SearchContext = createContext<ISearchContext>({} as ISearchContext);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchString, setSearchString] = useState<string>("");

  const handleSearchItems = useCallback(
    (value: string) => setSearchString(value),
    []
  );

  return (
    <SearchContext.Provider value={{ searchString, handleSearchItems }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): [string, (value: string) => void] => {
  const { searchString, handleSearchItems } = useContext(SearchContext);

  return [searchString, handleSearchItems];
};
