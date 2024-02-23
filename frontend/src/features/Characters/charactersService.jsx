import axios from "axios";
import CryptoJS from "crypto-js";

const apiKey = import.meta.env.VITE_MARVEL_API_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_MARVEL_API_PRIVATE_KEY;

const marvelApi = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public",
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

async function fetchComicCharacter(characterId) {
  try {
    const { ts, hash } = generateHash();
    const response = await marvelApi.get(`/characters/${characterId}/comics`, {
      params: {
        apikey: apiKey,
        ts: ts,
        hash: hash,
      },
    });
    const comics =
      response?.data?.data?.results?.map((comic) => ({
        id: comic.id,
        tittle: comic.title,
        resourceURI: comic.resourceURI,
        thumbnail: comic.thumbnail,
        dates: comic.dates,
      })) || [];
    return comics;
  } catch (error) {
    console.error("Error fetching character:", error);
    throw error;
  }
}

async function fetchFirstCharacters() {
  try {
    const { ts, hash } = generateHash();
    const response = await marvelApi.get("/characters", {
      params: {
        apikey: apiKey,
        ts: ts,
        hash: hash,
        limit: 100,
      },
    });
    const characters =
      response?.data?.data?.results?.map((character) => ({
        id: character.id,
        name: character.name,
        description: character.description,
        resourceURI: character.resourceURI,
        thumbnail: character.thumbnail,
        comics: character.comics.items,
      })) || [];
    return characters;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
}

async function fetchAllCharacters() {
  try {
    const limit = 100;
    let offset = 100;
    let allCharacters = [];
    let response;
    let totalCharacters = 0;
    const characterIdsSet = new Set();
    do {
      const { ts, hash } = generateHash();
      response = await marvelApi.get("/characters", {
        params: {
          apikey: apiKey,
          ts: ts,
          hash: hash,
          limit: limit,
          offset: offset,
        },
      });

      if (!totalCharacters) {
        totalCharacters = response?.data?.data?.total || 0;
      }
      // Extraer los personajes y sus cómics de la respuesta
      const characters =
        response?.data?.data?.results?.map((character) => ({
          id: character.id,
          name: character.name,
          description: character.description,
          resourceURI: character.resourceURI,
          thumbnail: character.thumbnail,
          comics: character.comics.items,
        })) || [];

      const uniqueCharacters = characters.filter(
        (character) => !characterIdsSet.has(character.id)
      );

      allCharacters = allCharacters.concat(uniqueCharacters);
      uniqueCharacters.forEach((character) => {
        characterIdsSet.add(character.id); // Agregar IDs de personajes al conjunto
      });
      offset += limit;
    } while (offset < totalCharacters && allCharacters.length < 1500);

    return allCharacters;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
}

export { fetchAllCharacters, fetchComicCharacter, fetchFirstCharacters };
