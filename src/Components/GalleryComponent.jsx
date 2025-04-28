import { useEffect, useState } from "react";
import PokemonCardComponent from "./PokemonCardComponent";
import Pagination from "./PaginationComponent";
import { Spinner, Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

import getFirst150Pokemon from "../utils/getFirst150Pokemon";
import {
  getLocalStorage,
  setToLocalStorage,
} from "../utils/localStorageGetterAndSetter";
import { useSearch } from "../context/SearchContext";

const CARDS_PER_PAGE = 10;

const Gallery = () => {
  const { searchQuery, selectedType } = useSearch();
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [currentPagePokemon, setCurrentPagePokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  useEffect(() => {
    if (pokemonData.length > 0) {
      const filtered = pokemonData.filter((pokemon) => {
        const matchesSearch = pokemon.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesType =
          selectedType === "All" ||
          pokemon.types.includes(selectedType.toLowerCase());
        return matchesSearch && matchesType;
      });

      setFilteredPokemonList(filtered);
      setTotalPages(Math.ceil(filtered.length / CARDS_PER_PAGE));
      setCurrentPage(1);
    }
  }, [pokemonData, searchQuery, selectedType]);

  useEffect(() => {
    if (filteredPokemonList.length > 0) {
      const lastCardIndex = CARDS_PER_PAGE * currentPage;
      const firstCardIndex = lastCardIndex - CARDS_PER_PAGE;
      setCurrentPagePokemon(
        filteredPokemonList.slice(firstCardIndex, lastCardIndex)
      );
    } else {
      setCurrentPagePokemon([]);
    }
  }, [currentPage, filteredPokemonList]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen absolute top-0 left-0 bg-(--gray-transparent-bg) backdrop-blur-md flex justify-center items-center">
        <div className="text-center">
          <Spinner className="mb-4" size="xl" />
          <p className="text-gray-100 text-lg">
            Please wait a bit :) <br /> Thank you for your patience!
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert color="failure" icon={HiInformationCircle}>
        <span className="font-medium">Error Fetching Data!</span> There seems to
        be some error fetching data please check your internet connection or try
        visit some after time.
      </Alert>
    );
  }

  return (
    <div className="w-screen h-[89%]">
      <div className="w-full h-[90%] grid gap-4 p-4 grid-cols-1 min-[390px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {currentPagePokemon.map((pokemon) => {
          return <PokemonCardComponent pokemon={pokemon} key={pokemon.id} />;
        })}
      </div>
      {filteredPokemonList.length > 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Gallery;
