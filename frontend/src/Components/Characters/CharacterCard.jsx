import { useState } from "react";
import { Card, Tooltip, Modal, Space } from "antd";
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
  const [isFavorite, setIsFavorite] = useState(
    favorites.includes(character.id)
  );
  const [open, setOpen] = useState(false);

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
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const uniqueComics = Array.from(new Set(comics.map((comic) => comic.id))).map(
    (id) => {
      return comics.find((comic) => comic.id === id);
    }
  );

  return (
    <div className="character-card">
      <Card
        onClick={handleCardClick}
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
        open={open}
        onCancel={handleCloseModal}
        footer={null}
      >
        <h3>Comics:</h3>
        <Space size={16} wrap>
          {uniqueComics.map((comic) => (
            <div key={comic.id} style={{ width: 200, textAlign: "center" }}>
              <h3 style={{ height: "40px" }}>{comic.tittle}</h3>
              <img
                alt={comic.tittle}
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                style={{ width: "100%", height: "auto" }}
              />
              <p>
                {new Date(
                  comic.dates.find((date) => date.type === "onsaleDate").date
                ).toDateString()}
              </p>
            </div>
          ))}
        </Space>
      </Modal>
    </div>
  );
};

export default CharacterCard;
