import { useEffect, useState } from "react";
import getFirst150Pokemon from "../utils/getFirst150Pokemon";
import {
  getLocalStorage,
  setToLocalStorage,
} from "../utils/localStorageGetterAndSetter";

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
