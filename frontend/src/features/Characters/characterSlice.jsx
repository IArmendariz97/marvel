// charactersSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllCharacters, fetchComicCharacter } from "./charactersService"; // Importamos la función para hacer la solicitud

// Creamos una acción asincrónica para cargar los personajes
export const loadCharacters = createAsyncThunk(
  "characters/loadCharacters",
  async () => {
    const response = await fetchAllCharacters();
    return response;
  }
);

export const loadComicCharacter = createAsyncThunk(
  "characters/loadComicCharacter",
  async (characterId) => {
    const response = await fetchComicCharacter(characterId);
    return response;
  }
);

// Creamos el slice de Redux
const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    characters: [],
    comics: [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    favoritesSearches:
      JSON.parse(localStorage.getItem("favoriteSearches")) || [],
    loading: false,
    loadingCharacters: false,
    error: null,
    searchResults: [],
  },
  reducers: {
    addFavoriteSearch: (state, action) => {
      const search = action.payload;
      if (!state.favoritesSearches.includes(search)) {
        state.favoritesSearches.push(search);
        localStorage.setItem(
          "favoriteSearches",
          JSON.stringify(state.favoritesSearches)
        );
      }
    },
    addFavorite: (state, action) => {
      const characterId = action.payload;
      if (!state.favorites.includes(characterId)) {
        state.favorites.push(characterId);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action) => {
      const characterId = action.payload;
      state.favorites = state.favorites.filter((id) => id !== characterId);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    filterCharacters: (state, action) => {
      const { searchValue, characters } = action.payload;
      const results = characters.filter((character) => {
        // Buscar en el nombre del personaje
        const characterName = character.name.toLowerCase();
        const value = searchValue.toLowerCase();
        if (characterName.includes(value)) {
          return true;
        }
      });
      state.searchResults = results;
    },
    filterCharactersByComic: (state, action) => {
      const { searchValue, characters } = action.payload;
      const results = characters.filter((character) => {
        const value = searchValue.toLowerCase();
        // Buscar en los nombres de los cómics del personaje
        for (const comic of character.comics) {
          if (comic.name.toLowerCase().includes(value)) {
            return true;
          }
        }
        return false;
      });
      state.searchResults = results;
    },
  },
  extraReducers: (builder) => {
    // Manejamos el caso de éxito de la acción loadCharacters
    builder.addCase(loadCharacters.pending, (state) => {
      console.log("Loading characters");
      state.loadingCharacters = true;
      state.error = null;
    });
    builder.addCase(loadCharacters.fulfilled, (state, action) => {
      state.loadingCharacters = false;
      state.characters = action.payload;
    });
    builder.addCase(loadCharacters.rejected, (state, action) => {
      state.loadingCharacters = false;
      state.error = action.error.message;
    });

    builder.addCase(loadComicCharacter.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loadComicCharacter.fulfilled, (state, action) => {
      state.loading = false;

      state.comics = action.payload;
    });
    builder.addCase(loadComicCharacter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const {
  addFavorite,
  removeFavorite,
  clearSearchResults,
  filterCharacters,
  filterCharactersByComic,
  addFavoriteSearch,
} = charactersSlice.actions;

export const selectCharacters = (state) => state.characters.characters;
export const selectFavorites = (state) => state.characters.favorites;
export const selectSearchResults = (state) => state.characters.searchResults;
export const selectFavoritesSearches = (state) =>
  state.characters.favoritesSearches;
export const selectComics = (state) => state.characters.comics;

export default charactersSlice;
