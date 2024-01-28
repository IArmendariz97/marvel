// charactersSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllCharacters } from "./charactersService"; // Importamos la función para hacer la solicitud

// Creamos una acción asincrónica para cargar los personajes
export const loadCharacters = createAsyncThunk(
  "characters/loadCharacters",
  async () => {
    const response = await fetchAllCharacters();
    return response.data.results;
  }
);

// Creamos el slice de Redux
const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    characters: [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    loading: false,
    error: null,
    searchResults: [], // Nuevo estado para almacenar los resultados de búsqueda
  },
  reducers: {
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
  },
  extraReducers: (builder) => {
    // Manejamos el caso de éxito de la acción loadCharacters
    builder.addCase(loadCharacters.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loadCharacters.fulfilled, (state, action) => {
      state.loading = false;
      state.characters = action.payload;
    });
    builder.addCase(loadCharacters.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { addFavorite, removeFavorite, clearSearchResults } =
  charactersSlice.actions;

export const selectCharacters = (state) => state.characters.characters;
export const selectFavorites = (state) => state.characters.favorites;
export const selectSearchResults = (state) => state.characters.searchResults;

export default charactersSlice;
