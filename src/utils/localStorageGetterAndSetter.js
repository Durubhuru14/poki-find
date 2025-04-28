const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

export function setToLocalStorage(data) {
  const pokemonCache = {
    data,
    timestamp: new Date().getTime(),
  };
  localStorage.setItem("pokemonDataCache", JSON.stringify(pokemonCache));
}

export function getLocalStorage() {
  const pokemonCache = localStorage.getItem("pokemonDataCache");
  if (!pokemonCache) return null;

  const { data, timestamp } = JSON.parse(pokemonCache);

  const isExpired = new Date().getTime() - timestamp > CACHE_EXPIRATION_TIME;
  return isExpired ? null : data;
}
