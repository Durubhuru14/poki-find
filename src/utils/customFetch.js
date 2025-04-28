import axios from "axios";
const API = "https://pokeapi.co/api/v2/pokemon";

const pokeAPIFetch = axios.create({
  baseURL: API,
});

export default pokeAPIFetch;
