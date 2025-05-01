import { createContext, useState, useContext } from "react";

/**
 * Context for managing Pokemon search and filter state.
 * Provides:
 * - Search query string for name-based filtering
 * - Selected Pokemon type for type-based filtering
 * - Setters for both filter criteria
 *
 * @type {React.Context}
 */
const SearchContext = createContext();

/**
 * Provider component that manages search and filter state for the application.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @returns {JSX.Element} Context provider component
 *
 * @example
 * <SearchProvider>
 *   <App />
 * </SearchProvider>
 */

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

/**
 * Custom hook for accessing search context values.
 *
 * @function
 * @returns {Object} Context values including:
 * @returns {string} searchQuery - Current search query string
 * @returns {function} setSearchQuery - Setter for search query
 * @returns {string} selectedType - Currently selected Pokemon type ("All" or specific type)
 * @returns {function} setSelectedType - Setter for selected type
 *
 * @example
 * const { searchQuery, setSearchQuery, selectedType, setSelectedType } = useSearch();
 */

// eslint-disable-next-line react-refresh/only-export-components
export function useSearch() {
  return useContext(SearchContext);
}
