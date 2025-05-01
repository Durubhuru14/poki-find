import TypeCard from "./TypeCard";
import { nanoid } from "nanoid";
import { Tooltip } from "flowbite-react";
import { useState } from "react";
import MovesModal from "./MovesModal";

const PokemonDetails = () => {
  const [showMovesModal, setShowMovesModal] = useState(false);
  const [visibleMovesCount] = useState(15);

  const toggleMovesModal = () => setShowMovesModal(!showMovesModal);

  const testData = {
    id: 1,
    name: "bulbasaur",
    types: ["grass", "poison"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      special_attack: 65,
      special_defense: 65,
      speed: 45,
    },
    abilities: [
      {
        name: "overgrow",
        is_hidden: false,
      },
      {
        name: "chlorophyll",
        is_hidden: true,
      },
    ],
    moves: [
      "razor-wind",
      "swords-dance",
      "cut",
      "bind",
      "vine-whip",
      "headbutt",
      "tackle",
      "body-slam",
      "take-down",
      "double-edge",
      "growl",
      "strength",
      "mega-drain",
      "leech-seed",
      "growth",
      "razor-leaf",
      "solar-beam",
      "poison-powder",
      "sleep-powder",
      "petal-dance",
      "string-shot",
      "toxic",
      "rage",
      "mimic",
      "double-team",
      "defense-curl",
      "light-screen",
      "reflect",
      "bide",
      "sludge",
      "skull-bash",
      "amnesia",
      "flash",
      "rest",
      "substitute",
      "snore",
      "curse",
      "protect",
      "sludge-bomb",
      "mud-slap",
      "outrage",
      "giga-drain",
      "endure",
      "charm",
      "false-swipe",
      "swagger",
      "fury-cutter",
      "attract",
      "sleep-talk",
      "return",
      "frustration",
      "safeguard",
      "sweet-scent",
      "synthesis",
      "hidden-power",
      "sunny-day",
      "rock-smash",
      "facade",
      "nature-power",
      "helping-hand",
      "ingrain",
      "knock-off",
      "secret-power",
      "weather-ball",
      "grass-whistle",
      "bullet-seed",
      "magical-leaf",
      "natural-gift",
      "worry-seed",
      "seed-bomb",
      "energy-ball",
      "leaf-storm",
      "power-whip",
      "captivate",
      "grass-knot",
      "venoshock",
      "acid-spray",
      "round",
      "echoed-voice",
      "grass-pledge",
      "work-up",
      "grassy-terrain",
      "confide",
      "grassy-glide",
      "tera-blast",
      "trailblaze",
    ],
    evolution: [
      {
        species: "bulbasaur",
        evolves_to: [],
        details: null,
      },
      {
        species: "ivysaur",
        evolves_to: [],
        details: {
          min_level: 16,
          trigger: "level-up",
        },
      },
      {
        species: "venusaur",
        evolves_to: [],
        details: {
          min_level: 32,
          trigger: "level-up",
        },
      },
    ],
  };

  return (
    <div className="h-dvh flex justify-center items-center dark:text-gray-100">
      <section className="dark:bg-gray-800 h-5/6 w-11/12 rounded-md p-2 overflow-y-auto">
        <div className="text-center flex flex-col gap-4">
          {/* Header (name, id) */}
          <div className="space-y-1">
            <p className="text-xl font-extrabold">#{testData.id}</p>
            <p className="capitalize text-2xl font-bold">{testData.name}</p>
          </div>

          {/* Pokemon sprite */}
          <div className="mx-auto bg-gray-50 h-[120px] w-[120px] rounded-lg dark:bg-gray-700 flex items-center justify-center">
            <img
              src={testData.sprite}
              alt={testData.name}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>

          {/* Types and abilities */}
          <div className="flex items-baseline justify-around w-full">
            <div className="self-start">
              <h2 className="text-start mb-1.5 font-bold">Types: </h2>
              <div className="flex gap-2">
                {testData.types.map((type) => {
                  return <TypeCard type={type} key={nanoid()} />;
                })}
              </div>
            </div>
            <div className="self-end">
              <h2 className="text-start mb-1.5 font-bold">Abilities: </h2>
              <div className="flex gap-2">
                {testData.abilities.map((ability) => {
                  return ability.is_hidden ? (
                    <Tooltip
                      key={nanoid()}
                      content="Hidden Ability: Rare, special ability often with unique effects"
                    >
                      <span
                        className="dark:bg-gray-700 italic inline-block p-2 rounded-md text-xs"
                        key={nanoid()}
                      >
                        {ability.name}
                      </span>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      key={nanoid()}
                      content="Standard Ability: Common ability for this Pokémon"
                    >
                      <span
                        className="dark:bg-gray-600 inline-block p-2 rounded-md text-xs"
                        key={nanoid()}
                      >
                        {ability.name}
                      </span>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Moves section */}
          <div className="w-full">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold">Moves:</h2>
              <span className="text-sm text-gray-500">
                {testData.moves.length} total
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {testData.moves.slice(0, visibleMovesCount).map((move) => (
                <span
                  key={nanoid()}
                  className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs"
                >
                  {move}
                </span>
              ))}

              {testData.moves.length > visibleMovesCount && (
                <button
                  onClick={toggleMovesModal}
                  className="text-blue-500 dark:text-blue-400 text-sm font-medium hover:underline"
                >
                  View all moves...
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Moves Modal */}
        {showMovesModal && (
          <MovesModal
            showMovesModal={showMovesModal}
            testData={testData}
            toggleMovesModal={toggleMovesModal}
          />
        )}
      </section>
    </div>
  );
};

export default PokemonDetails;
