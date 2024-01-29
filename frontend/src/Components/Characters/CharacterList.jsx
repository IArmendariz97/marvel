import React from "react";
import CharacterCard from "./CharacterCard";

const CharacterList = ({ characters }) => {
  return (
    <div className="character-list">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};

export default CharacterList;
