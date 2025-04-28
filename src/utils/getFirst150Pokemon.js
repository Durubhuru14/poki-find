import pokeAPIFetch from "./customFetch";

async function getFirst150Pokemon() {
  try {
    const listResponse = await pokeAPIFetch.get("/?limit=150");
    const pokemonList = listResponse.data.results;

    const pokemonPromises = pokemonList.map((pokemon) =>
      pokeAPIFetch
        .get(pokemon.url)
        .then((res) => res.data)
        .catch((err) => {
          console.warn(`Failed to fetch ${pokemon.name}:`, err.message);
          return null;
        })
    );

    const allPokemonList = await Promise.all(pokemonPromises);

    return allPokemonList
      .filter((pokemon) => pokemon !== null)
      .map((pokemon) => ({
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
