import pokeAPIFetch from "./customFetch";

const BATCH_SIZE = 6;

async function getFirst150Pokemon() {
  try {
    const listResponse = await pokeAPIFetch.get("/?limit=150");
    const pokemonList = listResponse.data.results;

    const pokemonMap = new Map();

    for (let i = 0; i < pokemonList.length; i += BATCH_SIZE) {
      const batch = pokemonList.slice(i, i + BATCH_SIZE);

      const batchResults = await Promise.allSettled(
        batch.map((pokemon) =>
          pokeAPIFetch
            .get(pokemon.url)
            .then(async (res) => {
              const pokemonData = res.data;

              const speciesResponse = await pokeAPIFetch.get(
                pokemonData.species.url
              );
              const speciesData = speciesResponse.data;

              let evolutionChain = null;
              if (speciesData.evolution_chain?.url) {
                try {
                  const evolutionResponse = await pokeAPIFetch.get(
                    speciesData.evolution_chain.url
                  );
                  evolutionChain = extractEvolutionChain(
                    evolutionResponse.data.chain
                  );
                } catch (error) {
                  console.warn(
                    `Evolution chain error for ${pokemonData.name}:`,
                    error.message
                  );
                }
              }

              const stats = {};
              for (const stat of pokemonData.stats) {
                const statName = stat.stat.name.replace("-", "_");
                stats[statName] = stat.base_stat;
              }

              const abilities = [];
              for (const ability of pokemonData.abilities) {
                abilities.push({
                  name: ability.ability.name,
                  is_hidden: ability.is_hidden,
                });
              }

              const moves = [];
              for (const move of pokemonData.moves) {
                moves.push(move.move.name);
              }

              return {
                id: pokemonData.id,
                name: pokemonData.name,
                types: pokemonData.types.map((t) => t.type.name),
                sprite: pokemonData.sprites.front_default,
                stats: {
                  hp: stats.hp || 0,
                  attack: stats.attack || 0,
                  defense: stats.defense || 0,
                  special_attack: stats.special_attack || 0,
                  special_defense: stats.special_defense || 0,
                  speed: stats.speed || 0,
                },
                abilities,
                moves,
                evolution: evolutionChain,
              };
            })
            .catch((err) => {
              console.warn(`Failed to fetch ${pokemon.name}:`, err.message);
              return null;
            })
        )
      );

      batchResults
        .filter((res) => res.status === "fulfilled" && res.value)
        .forEach((res) => {
          pokemonMap.set(res.value.id, res.value);
        });
    }

    return pokemonMap;
  } catch (error) {
    console.error("Critical fetch error:", error);
    throw error;
  }
}

function extractEvolutionChain(chain) {
  const evolutionChain = [];
  let current = chain;

  while (current) {
    evolutionChain.push({
      species: current.species.name,
      evolves_to: [],
      details: current.evolution_details[0]
        ? {
            min_level: current.evolution_details[0].min_level,
            trigger: current.evolution_details[0].trigger?.name,
            item: current.evolution_details[0].item?.name,
          }
        : null,
    });
    current = current.evolves_to[0];
  }
  return evolutionChain;
}

export default getFirst150Pokemon;
