import axios from "axios";
import CryptoJS from "crypto-js";

const apiKey = import.meta.env.VITE_MARVEL_API_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_MARVEL_API_PRIVATE_KEY;

const marvelApi = axios.create({
  baseURL: "http://gateway.marvel.com/v1/public",
  params: {
    apikey: apiKey,
  },
});

function generateHash() {
  const timestamp = Date.now().toString();
  const hash = CryptoJS.MD5(timestamp + privateKey + apiKey).toString();
  return {
    ts: timestamp,
    hash: hash,
  };
}

async function fetchAllCharacters() {
  try {
    const limit = 100;
    let offset = 0;
    let allCharacters = [];
    let response;
    do {
      const { ts, hash } = generateHash();
      const response = await marvelApi.get("/characters", {
        params: {
          apikey: apiKey,
          ts: ts,
          hash: hash,
          limit: limit,
          offset: offset,
        },
      });

      // Extraer los personajes y sus cómics de la respuesta
      const characters = response.data.data.results.map((character) => {
        const { id, name, description, resourceURI, thumbnail, comics } =
          character;
        const comicItems = comics.items;
        return {
          id,
          name,
          description,
          resourceURI,
          thumbnail,
          comics: comicItems,
        };
      });

      allCharacters = allCharacters.concat(characters);
      offset += limit;
    } while (offset < response.data.data.total);

    return allCharacters;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
}

export { fetchAllCharacters };
