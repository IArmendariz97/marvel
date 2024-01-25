// charactersSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCharacters } from "./charactersService"; // Importamos la función para hacer la solicitud

// Creamos una acción asincrónica para cargar los personajes
export const loadCharacters = createAsyncThunk(
  "characters/loadCharacters",
  async (searchTerm) => {
    const response = await fetchCharacters(searchTerm);
    return response.data.results;
  }
);

// Creamos el slice de Redux
const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    characters: [], // Estado inicial con un array de personajes vacío
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Podríamos definir otras acciones relacionadas con los personajes aquí, como agregar favoritos\
    addFavorite: (state, action) => {
      const characterId = action.payload;
      if (!state.favorites.includes(characterId)) {
        state.favorites.push(characterId);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
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

export const { addFavorite } = charactersSlice.actions;
export default charactersSlice.reducer;
