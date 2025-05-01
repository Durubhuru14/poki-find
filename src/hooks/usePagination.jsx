import { useState, useMemo, useEffect } from "react";

const CARDS_PER_PAGE = 10;

/**
 * Custom hook for handling pagination logic for Pokemon lists.
 * Manages current page state and provides paginated data slices.
 * Resets to first page when filtered list changes.
 *
 * @function
 * @param {Array} filteredPokemonList - The filtered list of Pokemon to paginate
 * @returns {Object} Pagination controls and data
 * @returns {number} currentPage - The current active page (1-based index)
 * @returns {function} setCurrentPage - Function to update the current page
 * @returns {number} totalPages - Total number of available pages
 * @returns {Array} currentPagePokemon - Subset of Pokemon for current page
 *
 * @example
 * const { currentPage, setCurrentPage, totalPages, currentPagePokemon } = usePagination(filteredPokemon);
 *
 * @constant {number} CARDS_PER_PAGE - Number of items to display per page (10)
 */

const usePagination = (filteredPokemonList) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredPokemonList]);

  const totalPages = useMemo(
    () => Math.ceil(filteredPokemonList.length / CARDS_PER_PAGE),
    [filteredPokemonList]
  );

  const currentPagePokemon = useMemo(() => {
    if (filteredPokemonList.length === 0) return [];
    const start = (currentPage - 1) * CARDS_PER_PAGE;
    return filteredPokemonList.slice(start, start + CARDS_PER_PAGE);
  }, [currentPage, filteredPokemonList]);

  return { currentPage, setCurrentPage, totalPages, currentPagePokemon };
};
export default usePagination;
