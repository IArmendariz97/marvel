import { Space, Button, Layout, AutoComplete, Modal } from "antd";
import { StarOutlined } from "@ant-design/icons";
import marvelLogo from "../../assets/marvel.png";
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import DarkModeToggle from "../DarkModeToggle";
const { Header } = Layout;

const Navbar = ({
  onSearch,
  onFavoritesClick,
  filterByCharacter,
  setFilterByCharacter,
  renderFavoriteSearches,
  clearSearchResults,
}) => {
  const { loading } = useSelector((state) => state.characters);
  const [options, setOptions] = useState([]);
  const [favoriteSearchesVisible, setFavoriteSearchesVisible] = useState(false);

  const handleSearch = (value) => {
    onSearch(value);
  };
  const [darkMode, setDarkMode] = useState(false);

  const characters = useSelector((state) => state.characters.characters);
  const comics = useMemo(() => {
    const comicsSet = new Set();
    characters.forEach((character) => {
      character.comics.forEach((comic) => comicsSet.add(comic.name));
    });
    return [...comicsSet];
  }, [characters]);

  const allOptions = useMemo(() => {
    if (filterByCharacter) {
      return characters.map((character) => character.name);
    } else {
      return comics;
    }
  }, [characters, comics, filterByCharacter]);

  const handleSearchChange = (value) => {
    onSearch(value);
    const filteredOptions = allOptions.filter(
      (option) => option.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    setOptions(filteredOptions.map((option) => ({ value: option })));
  };

  const handleToggleFilter = () => {
    clearSearchResults();
    setFilterByCharacter((prevFilterByCharacter) => !prevFilterByCharacter);
  };

  const handleFavoritesClick = () => {
    onFavoritesClick(); // Llama a la función original para manejar los favoritos
    toggleFavoriteSearchesModal(); // Abre el modal de búsquedas favoritas
  };

  const toggleFavoriteSearchesModal = () => {
    setFavoriteSearchesVisible(!favoriteSearchesVisible);
  };
  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Header
      className="ant-layout-header navbar"
      id="navbar"
      style={{
        background: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <img src={marvelLogo} alt="Marvel logo" className="navbarLogo" />
      <div className="search">
        <Space className="spaceSearch">
          <AutoComplete
            options={options}
            onSearch={handleSearchChange}
            onSelect={handleSearch}
            placeholder={
              loading
                ? "WAIT UNTIL ALL CHARACTERS ARE LOADED"
                : `Search ${filterByCharacter ? "characters" : "comics"}`
            }
            style={{ width: 400, marginTop: 16 }}
            disabled={loading}
            className="searchInput"
          />
          <Button onClick={handleToggleFilter}>
            {filterByCharacter ? "Filter by Comic" : "Filter by Character"}
          </Button>
        </Space>
        <DarkModeToggle onClick={handleDarkMode} />
      </div>
      <Button
        icon={<StarOutlined />}
        onClick={handleFavoritesClick}
        className="favoritesButton"
      />
      <Modal
        title="Favorite Searches"
        open={favoriteSearchesVisible}
        onCancel={toggleFavoriteSearchesModal}
        footer={null}
      >
        {renderFavoriteSearches()}
      </Modal>
    </Header>
  );
};

export default Navbar;
