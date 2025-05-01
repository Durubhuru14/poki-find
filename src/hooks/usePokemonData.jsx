import { useEffect, useState } from "react";
import getFirst150Pokemon from "../utils/getFirst150Pokemon";
import {
  getLocalStorage,
  setToLocalStorage,
} from "../utils/localStorageGetterAndSetter";

/**
 * Custom hook for fetching and managing Pokemon data with caching support.
 * Fetches the first 150 Pokemon either from cache or API, with loading and error states.
 *
 * @function
 * @returns {Object} Pokemon data and state indicators
 * @returns {Array} pokemonData - Array of Pokemon objects
 * @returns {boolean} isLoading - Loading state indicator
 * @returns {boolean} isError - Error state indicator
 *
 * @example
 * // Usage in a component
 * const { pokemonData, isLoading, isError } = usePokemonData();
 *
 * @see {@link getFirst150Pokemon} for the data fetching implementation
 * @see {@link getLocalStorage} for cached data retrieval
 * @see {@link setToLocalStorage} for data caching
 *
 * @behavior
 * - Checks localStorage for cached data first
 * - Falls back to API fetch if no cache exists
 * - Automatically caches fresh API data
 * - Manages loading states during operations
 * - Sets error state if fetch fails
 */

const usePokemonData = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const cachedData = getLocalStorage();

        if (cachedData) {
          setPokemonData(cachedData);
          setIsLoading(false);
          return;
        }
        const freshData = await getFirst150Pokemon();
        setPokemonData(freshData);
        setToLocalStorage(freshData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchPokemonData();
  }, []);

  return { pokemonData, isLoading, isError };
};
export default usePokemonData;
