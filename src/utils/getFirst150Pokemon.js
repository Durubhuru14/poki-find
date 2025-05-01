import pokeAPIFetch from "./customFetch";

const BATCH_SIZE = 6;

async function getFirst150Pokemon() {
  try {
    const listResponse = await pokeAPIFetch.get("/?limit=150");
    const pokemonList = listResponse.data.results;

    const allPokemon = [];
    for (let i = 0; i < pokemonList.length; i += BATCH_SIZE) {
      const batch = pokemonList.slice(i, i + BATCH_SIZE);

      const batchResults = await Promise.allSettled(
        batch.map((pokemon) =>
          pokeAPIFetch
            .get(pokemon.url)
            .then((res) => ({ data: res.data }))
            .catch((err) => {
              console.warn(`Failed to fetch ${pokemon.name}:`, err.message);
              return null;
            })
        )
      );

      allPokemon.push(
        ...batchResults
          .filter((res) => res.status === "fulfilled" && res.value?.data)
          .map((res) => res.value.data)
      );
    }

    return allPokemon.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types.map((t) => t.type.name),
      sprite: pokemon.sprites.front_default,
    }));
  } catch (error) {
    console.error("Critical fetch error:", error);
    throw error;
  }
}

export default getFirst150Pokemon;
