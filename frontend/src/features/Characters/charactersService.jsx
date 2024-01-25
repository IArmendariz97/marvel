import axios from "axios";

const apiKey = import.meta.env.VITE_MARVEL_API_PUBLIC_KEY;

const marvelApi = axios.create({
  baseURL: "http://gateway.marvel.com/v1/public",
  params: {
    apikey: apiKey,
  },
});

export const fetchCharacters = async (searchTerm) => {
  try {
    const response = await marvelApi.get("/characters", {
      params: {
        nameStartsWith: searchTerm,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};
