/**
 * Array of Pokemon types with their associated colors.
 * Provides a comprehensive list of all Pokemon types with official color codes.
 *
 * @constant {Array<Object>} typesOfPokemon
 * @property {string} type - The name of the Pokemon type (e.g., "Fire", "Water")
 * @property {string} color - The hexadecimal color code associated with the type
 *
 * @example
 * // Find a specific type's color
 * const fireType = typesOfPokemon.find(t => t.type === "Fire");
 * console.log(fireType.color); // "#f08030"
 *
 * @example
 * // Map to select options
 * const typeOptions = typesOfPokemon.map(({ type }) => type);
 *
 * @description
 * Contains all standard Pokemon types including:
 * - Normal, Fire, Water, Electric, Grass
 * - Ice, Fighting, Poison, Ground, Flying
 * - Psychic, Bug, Rock, Ghost, Dragon
 * - Dark, Steel, Fairy, Stellar
 */

const typesOfPokemon = [
  { type: "Normal", color: "#a8a878" },
  { type: "Fire", color: "#f08030" },
  { type: "Water", color: "#6890f0" },
  { type: "Electric", color: "#f8d030" },
  { type: "Grass", color: "#78c850" },
  { type: "Ice", color: "#98d8d8" },
  { type: "Fighting", color: "#c03028" },
  { type: "Poison", color: "#a040a0" },
  { type: "Ground", color: "#e0c068" },
  { type: "Flying", color: "#a890f0" },
  { type: "Psychic", color: "#f85888" },
  { type: "Bug", color: "#a8b820" },
  { type: "Rock", color: "#b8a038" },
  { type: "Ghost", color: "#705898" },
  { type: "Dragon", color: "#7038f8" },
  { type: "Dark", color: "#705848" },
  { type: "Steel", color: "#b8b8d0" },
  { type: "Fairy", color: "#f0b6bc" },
  { type: "Stellar", color: "#35ace7" },
];

export default typesOfPokemon;
