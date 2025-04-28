import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedType,
        setSelectedType,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSearch() {
  return useContext(SearchContext);
}
