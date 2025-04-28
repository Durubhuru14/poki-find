import {
  Navbar,
  NavbarBrand,
  TextInput,
  Button,
  NavbarCollapse,
  NavbarToggle,
  Select,
} from "flowbite-react";
import typesOfPokemon from "../utils/typesOfPokemon";
import { useSearch } from "../context/SearchContext";
import logo from "../assets/pokeball.png";

export default function NavbarComponent() {
  const { searchQuery, setSearchQuery, selectedType, setSelectedType } =
    useSearch();

  const handleSelect = (e) => {
    setSelectedType(e.target.value);
  };

  const handleInput = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Navbar fluid>
      <NavbarBrand href="/" className="flex justify-center items-center gap-1">
        <img src={logo} className="h-8" alt="PokiFind Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          <b>P</b>oki<b>F</b>ind<b>.</b>
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="flex gap-2">
            <TextInput
              placeholder="e.g. Pikachu, Jigglypuff"
              className="w-3/6 md:w-auto"
              onChange={handleInput}
              value={searchQuery}
            />
            <Select
              id="types"
              className="w-22"
              required
              value={selectedType}
              onChange={handleSelect}
            >
              <option>All</option>
              {typesOfPokemon.map(({ type, color }) => {
                return <option key={color}>{type}</option>;
              })}
            </Select>
          </div>
          <Button className="cursor-pointer">Search</Button>
        </div>
      </NavbarCollapse>
    </Navbar>
  );
}
