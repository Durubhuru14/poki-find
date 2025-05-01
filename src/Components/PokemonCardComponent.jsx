import { nanoid } from "nanoid";
import typesOfPokemon from "../utils/typesOfPokemon";

import { useState, useEffect } from "react";
import { FcRemoveImage } from "react-icons/fc";
import { Spinner } from "flowbite-react";

/**
 * Displays a colored badge for a Pokemon type.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.type - Pokemon type to display
 * @returns {JSX.Element} Styled type badge
 * @private
 */

const TypeCard = ({ type }) => {
  const colorCodeOfType = typesOfPokemon.find(
    (typeOfPokemon) => typeOfPokemon.type.toLowerCase() === type.toLowerCase()
  );

  return (
    <span
      className="inline-block p-2 rounded-md text-xs"
      style={{ background: colorCodeOfType.color }}
    >
      {type}
    </span>
  );
};

/**
 * Handles lazy loading of Pokemon sprites with loading and error states.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.sprite - URL of the sprite image
 * @param {string} props.name - Pokemon name (for alt text)
 * @returns {JSX.Element} Sprite container with loading/error states
 * @private
 */

const PokemonSpriteLazyLoad = ({ sprite, name }) => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!sprite) {
      setStatus("error");
      return;
    }

    const img = new Image();
    img.onload = () => setStatus("loaded");
    img.onerror = () => setStatus("error");
    img.src = sprite;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [sprite]);

  return (
    <div className="relative mb-2 text-center bg-gray-50 h-[120px] rounded-lg dark:bg-gray-700 flex items-center justify-center">
      {status === "loading" && <Spinner size="lg" />}

      {status === "error" && (
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <FcRemoveImage className="text-3xl" />
          <span className="text-xs">Image unavailable</span>
        </div>
      )}

      {status === "loaded" && (
        <img src={sprite} alt={name} className="w-full h-full object-contain" />
      )}
    </div>
  );
};

/**
 * Displays a Pokemon card with sprite, ID, name, and types.
 * Includes lazy loading and error handling for the Pokemon sprite.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.pokemon - Pokemon data object
 * @param {string} props.pokemon.id - Pokemon ID
 * @param {string} props.pokemon.name - Pokemon name
 * @param {string} props.pokemon.sprite - URL of Pokemon sprite image
 * @param {string[]} props.pokemon.types - Array of Pokemon types
 * @returns {JSX.Element} Pokemon card component
 *
 * @example
 * <PokemonCardComponent pokemon={{
 *   id: "25",
 *   name: "Pikachu",
 *   sprite: "https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/25.png",
 *   types: ["Electric"]
 * }} />
 */

const PokemonCardComponent = ({ pokemon }) => {
  const { id, name, sprite, types } = pokemon;
  return (
    <section className="h-[260px] bg-gray-300 dark:bg-gray-600 rounded-md p-4 overflow-hidden">
      <div className="mt-2 font-retro text-xs dark:bg-gray-600 dark:text-gray-100">
        <PokemonSpriteLazyLoad sprite={sprite} name={name} />
        <p className="text-cyan-700 dark:text-cyan-300"> ID: {id}</p>
        <p className="text-rose-700 dark:text-rose-300 mt-1"> Name: {name}</p>
        <div className="mt-2">
          <p>Type:</p>
          <div className="flex gap-2">
            {types.map((type) => {
              return <TypeCard type={type} key={nanoid()} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
export default PokemonCardComponent;
