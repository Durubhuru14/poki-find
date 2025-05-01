// Component import
import PokemonCardComponent from "./PokemonCardComponent";
import Pagination from "./PaginationComponent";

// Flowbite imports
import { Spinner, Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

// Custom hooks
import usePokemonData from "../Hooks/usePokemonData";
import usePagination from "../hooks/usePagination";
import useSearchFilter from "../hooks/useSearchFilter";

const Gallery = () => {
  const { pokemonData, isError, isLoading } = usePokemonData();
  const { filteredPokemonList } = useSearchFilter(pokemonData);
  const { currentPage, currentPagePokemon, setCurrentPage, totalPages } =
    usePagination(filteredPokemonList);

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
    <div className="w-screen h-[100%]">
      <div className="w-full h-[95%] grid gap-4 px-8 py-6 overflow-scroll grid-cols-1 min-[390px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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
