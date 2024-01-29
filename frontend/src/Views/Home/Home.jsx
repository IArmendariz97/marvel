import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Components/Nav/Nav";
import { Spin, Pagination } from "antd"; // Importar componente de paginación
import CharacterList from "../../Components/Characters/CharacterList";
import {
  loadCharacters,
  selectCharacters,
  selectSearchResults,
  filterCharacters,
  clearSearchResults,
  filterCharactersByComic,
} from "../../features/Characters/characterSlice";

import video from "../../assets/Marvel.mp4";

const Home = () => {
  const dispatch = useDispatch();
  const characters = useSelector(selectCharacters);
  const searchResults = useSelector(selectSearchResults);
  const [dispatchie, setDispatchie] = useState(false);
  const [filterByCharacter, setFilterByCharacter] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const [favoriteSearches, setFavoriteSearches] = useState([]);

  // Función para manejar el cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calcular el índice inicial y final de los personajes a mostrar en la página actual
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Filtrar los personajes de acuerdo a la búsqueda y paginar los resultados
  const paginatedCharacters = searchQuery
    ? searchResults.slice(startIndex, endIndex)
    : characters.slice(startIndex, endIndex);

  console.log(characters);

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
      setFavoriteSearches((prevSearches) => [
        ...prevSearches,
        searchQuery.trim(),
      ]);
    }
  };

  const renderFavoriteSearches = () => {
    // Crear un conjunto para almacenar búsquedas únicas
    const uniqueSearches = new Set(favoriteSearches);

    // Convertir el conjunto nuevamente a un array
    const uniqueSearchesArray = Array.from(uniqueSearches);

    return (
      <ul>
        {uniqueSearchesArray.map((search, index) => (
          <li key={index} onClick={() => handleSearch(search)}>
            {search}
          </li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    localStorage.setItem("favoriteSearches", JSON.stringify(favoriteSearches));
  }, [favoriteSearches]);

  useEffect(() => {
    const storedFavoriteSearches = JSON.parse(
      localStorage.getItem("favoriteSearches")
    );
    if (storedFavoriteSearches) {
      setFavoriteSearches(storedFavoriteSearches);
    }
  }, []);

  useEffect(() => {
    if (characters.length === 0 && !dispatchie) {
      dispatch(loadCharacters());
      setDispatchie(true);
    }
  }, [dispatch]); // Agregar charactersLoaded como dependencia del efecto

  return (
    <div className="home">
      <Navbar
        onSearch={handleSearch}
        onFavoritesClick={handleFavoritesClick}
        filterByCharacter={filterByCharacter}
        setFilterByCharacter={setFilterByCharacter}
        renderFavoriteSearches={renderFavoriteSearches}
      />
      {characters && characters.length === 0 && !dispatchie ? (
        <div>
          <video width={"100%"} height={"100%"} autoPlay loop muted>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
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
