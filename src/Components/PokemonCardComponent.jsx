import { nanoid } from "nanoid";
import typesOfPokemon from "../utils/typesOfPokemon";

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

const PokemonCardComponent = ({ pokemon }) => {
  const { id, name, sprite, types } = pokemon;
  return (
    <section className="h-[250px] bg-gray-300 dark:bg-gray-600 rounded-md p-4 overflow-hidden">
      <div className="bg-gray-50 h-2/4 flex justify-center items-center rounded-lg dark:bg-gray-700">
        <img src={sprite} alt={name} />
      </div>
      <div className="mt-2 font-retro text-xs dark:bg-gray-600 dark:text-gray-100">
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
