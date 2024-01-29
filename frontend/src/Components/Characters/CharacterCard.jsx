import React, { useState } from "react";
import { Card, Tooltip, Modal } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  selectFavorites,
  loadComicCharacter,
  selectComics,
} from "../../features/Characters/characterSlice";

const { Meta } = Card;

const CharacterCard = ({ character }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const comics = useSelector(selectComics);
  console.log(comics);
  const [isFavorite, setIsFavorite] = useState(
    favorites.includes(character.id)
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleToggleFavorite = (event) => {
    event.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite(character.id));
    } else {
      dispatch(addFavorite(character.id));
    }
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    dispatch(loadComicCharacter(character.id));
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="character-card" onClick={handleCardClick}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt={character.name}
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            style={{ height: 250 }}
          />
        }
      >
        <Meta
          title={character.name}
          description={
            <Tooltip
              title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            >
              <StarOutlined
                onClick={handleToggleFavorite}
                style={{ color: isFavorite ? "yellow" : "white" }}
              />
            </Tooltip>
          }
        />
      </Card>
      <Modal
        title={character.name}
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      ></Modal>
    </div>
  );
};

export default CharacterCard;
