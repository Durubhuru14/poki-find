import axios from "axios";
const API = "https://pokeapi.co/api/v2/pokemon";

/**
 * Pre-configured Axios instance for PokeAPI requests.
 * Sets base URL to the official Pokemon API endpoint.
 *
 * @constant {Object} pokeAPIFetch
 * @property {string} baseURL - The base API URL (https://pokeapi.co/api/v2/pokemon)
 *
 * @example
 * // Usage example:
 * pokeAPIFetch.get('/pikachu')
 *   .then(response => console.log(response.data))
 *   .catch(error => console.error(error));
 *
 * @see {@link https://pokeapi.co/docs/v2|PokeAPI Documentation}
 */

const pokeAPIFetch = axios.create({
  baseURL: API,
});

export default pokeAPIFetch;
