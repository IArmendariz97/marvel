import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Components/Nav/Nav";
import CharacterList from "../../Components/Characters/CharacterList";
import {
  loadCharacters,
  selectCharacters,
  selectSearchResults,
  addFavorite,
  removeFavorite,
  clearSearchResults,
} from "../../features/Characters/characterSlice";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const characters = useSelector(selectCharacters);
  const searchResults = useSelector(selectSearchResults);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value) => {
    if (value.trim() === "") {
      dispatch(clearSearchResults());
    } else {
      const results = characters.filter((character) => {
        return character.name.toLowerCase().includes(value.toLowerCase());
      });
      dispatch({ type: "characters/setSearchResults", payload: results });
    }
  };

  const handleFavoritesClick = (characterId) => {
    // Lógica para mostrar los favoritos
  };

  const handleCharacterClick = (characterId) => {
    // Lógica para mostrar el detalle del personaje
  };

  useEffect(() => {
    dispatch(loadCharacters());
  }, [dispatch]);

  return (
    <div className="home">
      <Navbar onSearch={handleSearch} onFavoritesClick={handleFavoritesClick} />
      <CharacterList
        characters={searchQuery ? searchResults : characters}
        onCharacterClick={handleCharacterClick}
      />
    </div>
  );
};

export default Home;
