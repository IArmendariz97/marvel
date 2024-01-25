import { useSelector, useDispatch } from "react-redux";
import { addFavorite } from "../../features/Characters/characterSlice";

import CharacterCard from "./CharacterCard";

const CharacterList = () => {
  const characters = useSelector((state) => state.characters.characters);
  const dispatch = useDispatch();

  const handleAddFavorite = (characterId) => {
    // Llama a la acción addFavorite con el ID del personaje
    dispatch(addFavorite(characterId));
  };

  return (
    <div className="character-list">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          onAddFavorite={handleAddFavorite}
        />
      ))}
    </div>
  );
};

export default CharacterList;
