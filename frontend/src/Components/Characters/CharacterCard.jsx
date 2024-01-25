import { useSelector } from "react-redux";

const CharacterCard = ({ character, onAddFavorite }) => {
  const isFavorite = useSelector((state) =>
    state.characters.favorites.includes(character.id)
  );

  return (
    <div className="character-card">
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      {/* Agregar el botón de favoritos */}
      <button
        onClick={() => onAddFavorite(character.id)}
        style={{ backgroundColor: isFavorite ? "yellow" : "transparent" }}
      >
        {isFavorite ? "Favorito" : "Agregar a Favoritos"}
      </button>
    </div>
  );
};

export default CharacterCard;
