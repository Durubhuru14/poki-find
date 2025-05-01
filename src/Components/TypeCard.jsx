import typesOfPokemon from "../utils/typesOfPokemon";

/**
 * Displays a colored badge for a Pokemon type.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.type - Pokemon type to display
 * @returns {JSX.Element} Styled type badge
 * @private
 */

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

export default TypeCard;
