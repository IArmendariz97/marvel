import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const CharacterCard = ({ character, onClick }) => {
  return (
    <div className="character-card" onClick={onClick}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt={character.name}
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          />
        }
      >
        <Meta title={character.name} description={character.description} />
      </Card>
    </div>
  );
};

export default CharacterCard;
