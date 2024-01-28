import { configureStore } from "@reduxjs/toolkit";
import charactersSlice from "../features/Characters/characterSlice";

// Configurar la persistencia para el slice USER

const rootReducer = {
  characters: charactersSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export { store };
