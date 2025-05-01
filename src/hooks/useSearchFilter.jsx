import { useMemo } from "react";
import { useSearch } from "../context/SearchContext";

/**
 * Custom hook for filtering Pokemon data based on search query and selected type.
 * Combines both name-based search and type filtering in a single operation.
 *
 * @function
 * @param {Array} pokemonData - The complete list of Pokemon to filter
 * @returns {Object} An object containing the filtered results
 * @returns {Array} filteredPokemonList - The filtered array of Pokemon matching search criteria
 *
 * @example
 * // Basic usage
 * const { filteredPokemonList } = useSearchFilter(pokemonData);
 *
 * @dependencies
 * - Relies on search context for query and type values
 * - Requires pokemonData prop for source data
 *
 * @filterLogic
 * - Name matching: case-insensitive partial match
 * - Type matching: exact match or "All" types
 * - Combines both filters with AND logic
 * - Returns empty array if input data is empty
 *
 * @performance
 * - Uses memoization to optimize filtering
 * - Only recalculates when dependencies change
 * - Handles empty input data efficiently
 */

const useSearchFilter = (pokemonData) => {
  const { searchQuery, selectedType } = useSearch();
  const filteredPokemonList = useMemo(() => {
    if (pokemonData.length === 0) return [];

    return pokemonData.filter((pokemon) => {
      const matchesSearch = pokemon.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesType =
        selectedType === "All" ||
        pokemon.types.includes(selectedType.toLowerCase());
      return matchesSearch && matchesType;
    });
  }, [pokemonData, searchQuery, selectedType]);
  return { filteredPokemonList };
};
export default useSearchFilter;
