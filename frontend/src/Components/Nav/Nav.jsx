import { Input, Space, Button, Layout, AutoComplete } from "antd";
import { StarOutlined } from "@ant-design/icons";
import marvelLogo from "../../assets/marvel.png";
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
const { Header } = Layout;

const Navbar = ({ onSearch, onFavoritesClick }) => {
  const { loading } = useSelector((state) => state.characters);
  const [options, setOptions] = useState([]); // Estado para almacenar las opciones filtradas

  const handleSearch = (value) => {
    onSearch(value);
  };

  const characters = useSelector((state) => state.characters.characters);
  const comics = useMemo(() => {
    const comicsSet = new Set();
    characters.forEach((character) => {
      character.comics.forEach((comic) => comicsSet.add(comic.name));
    });
    return [...comicsSet];
  }, [characters]);

  // Combinar los nombres de los personajes y cómics
  const allOptions = useMemo(
    () => [...characters.map((character) => character.name), ...comics],
    [characters, comics]
  );

  // Filtrar opciones basadas en el valor de búsqueda
  const handleSearchChange = (value) => {
    onSearch(value);
    const filteredOptions = allOptions.filter(
      (option) => option.toLowerCase().indexOf(value.toLowerCase()) !== -1 // Filtrar opciones que contienen el valor de búsqueda
    );
    setOptions(
      filteredOptions.map((option) => ({ value: option })) // Actualizar el estado con las opciones filtradas
    );
  };

  return (
    <Header className="ant-layout-header navbar">
      <img src={marvelLogo} alt="Marvel logo" className="navbarLogo" />
      <div className="search">
        <Space>
          <AutoComplete
            options={options}
            onSearch={handleSearchChange} // Llamar a la función de búsqueda cuando cambia el texto
            onSelect={handleSearch}
            placeholder={
              loading
                ? "WAIT UNTIL ALL CHARACTERS ARE LOADED"
                : "Search characters or comics"
            }
            style={{ width: 400, marginTop: 16 }}
            disabled={loading}
          />
        </Space>
      </div>
      <Button
        icon={<StarOutlined />}
        onClick={onFavoritesClick}
        className="favoritesButton"
      />
    </Header>
  );
};

export default Navbar;
