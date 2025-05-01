import { useMemo } from "react";
import { useSearch } from "../context/SearchContext";

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
  return {filteredPokemonList}
};
export default useSearchFilter;
