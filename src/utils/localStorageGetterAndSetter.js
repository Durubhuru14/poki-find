/**
 * Cache expiration time constant (24 hours in milliseconds).
 * @constant {number} CACHE_EXPIRATION_TIME
 */

const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

/**
 * Saves Pokemon data to localStorage with a timestamp for cache validation.
 *
 * @function
 * @param {Array} data - The Pokemon data to cache
 * @returns {void}
 *
 * @example
 * // Cache fresh Pokemon data
 * setToLocalStorage(pokemonData);
 *
 * @storageFormat
 * {
 *   data: Array,    // The actual Pokemon data
 *   timestamp: number // Unix timestamp of when data was cached
 * }
 */

export function setToLocalStorage(data) {
  const pokemonCache = {
    data,
    timestamp: new Date().getTime(),
  };
  localStorage.setItem("pokemonDataCache", JSON.stringify(pokemonCache));
}

/**
 * Retrieves cached Pokemon data from localStorage if it exists and isn't expired.
 *
 * @function
 * @returns {Array|null} The cached Pokemon data or null if cache is missing/expired
 *
 * @example
 * // Get cached data
 * const cachedData = getLocalStorage();
 * if (cachedData) {
 *   // Use cached data
 * }
 *
 * @cacheValidation
 * - Returns null if no cache exists
 * - Returns null if cache is older than CACHE_EXPIRATION_TIME
 * - Returns cached data if valid and fresh
 */

export function getLocalStorage() {
  const pokemonCache = localStorage.getItem("pokemonDataCache");
  if (!pokemonCache) return null;

  const { data, timestamp } = JSON.parse(pokemonCache);

  const isExpired = new Date().getTime() - timestamp > CACHE_EXPIRATION_TIME;
  return isExpired ? null : data;
}
