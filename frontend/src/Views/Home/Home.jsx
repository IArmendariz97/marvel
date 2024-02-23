import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Components/Nav/Nav";
import { Pagination } from "antd"; // Importar componente de paginación
import CharacterList from "../../Components/Characters/CharacterList";
import {
  loadCharacters,
  loadFirstCharacters,
  selectCharacters,
  selectSearchResults,
  filterCharacters,
  clearSearchResults,
  filterCharactersByComic,
  addFavoriteSearch,
  selectFavoritesSearches,
} from "../../features/Characters/characterSlice";

const Home = () => {
  const dispatch = useDispatch();
  const characters = useSelector(selectCharacters);
  const searchResults = useSelector(selectSearchResults);
  const [dispatchie, setDispatchie] = useState(false);
  const [filterByCharacter, setFilterByCharacter] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const { loadingCharacters } = useSelector((state) => state.characters);
  const favoritesSearches = useSelector(selectFavoritesSearches);
  // Función para manejar el cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  console.log(characters);
  // Calcular el índice inicial y final de los personajes a mostrar en la página actual
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Filtrar los personajes de acuerdo a la búsqueda y paginar los resultados
  const paginatedCharacters = searchQuery
    ? searchResults.slice(startIndex, endIndex)
    : characters.slice(startIndex, endIndex);

  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1); // Volver a la primera página al realizar una búsqueda
    if (value.trim() === "") {
      dispatch(clearSearchResults());
    } else {
      if (filterByCharacter) {
        dispatch(filterCharacters({ searchValue: value, characters }));
      } else {
        dispatch(filterCharactersByComic({ searchValue: value, characters }));
      }
    }
  };

  const handleFavoritesClick = () => {
    if (searchQuery.trim() !== "") {
      dispatch(addFavoriteSearch(searchQuery));
    }
  };

  const renderFavoriteSearches = () => {
    // Crear un conjunto para almacenar búsquedas únicas
    const uniqueSearches = new Set(favoritesSearches);

    // Convertir el conjunto nuevamente a un array
    const uniqueSearchesArray = Array.from(uniqueSearches);

    return (
      <ul>
        {uniqueSearchesArray.map((search, index) => (
          <li
            key={index}
            onClick={() => handleSearch(search)}
            className="liSearches"
          >
            {search}
          </li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    const loadAllCharacters = async () => {
      if (characters.length === 0 && !dispatchie) {
        await dispatch(loadFirstCharacters());
        await dispatch(loadCharacters());
        console.log("dispatched");
        setDispatchie(true);
      }
    };

    loadAllCharacters();
  }, [dispatch]);

  return (
    <div className="home">
      <Navbar
        onSearch={handleSearch}
        onFavoritesClick={handleFavoritesClick}
        filterByCharacter={filterByCharacter}
        setFilterByCharacter={setFilterByCharacter}
        renderFavoriteSearches={renderFavoriteSearches}
        clearSearchResults={clearSearchResults}
      />
      {loadingCharacters ? (
        <div className="loader"></div>
      ) : (
        <>
          <CharacterList
            characters={paginatedCharacters} // Utilizar los personajes paginados
          />
          <Pagination // Componente de paginación
            current={currentPage}
            pageSize={pageSize}
            total={searchQuery ? searchResults.length : characters.length} // Total de resultados considerando la búsqueda
            onChange={handlePageChange}
            style={{ marginTop: 16, textAlign: "center" }}
          />
        </>
      )}
    </div>
  );
};

export default Home;
