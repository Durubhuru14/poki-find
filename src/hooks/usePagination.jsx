import { useState, useMemo, useEffect } from "react";

const CARDS_PER_PAGE = 10;

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
