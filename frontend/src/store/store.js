import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import charactersSlice from "../features/Characters/characterSlice";

// Configura la persistencia para el slice de personajes
const charactersPersistConfig = {
  key: "characters",
  storage,
};

const rootReducer = combineReducers({
  characters: persistReducer(charactersPersistConfig, charactersSlice.reducer),
  // Agrega otros reducers aquí si los tienes
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
