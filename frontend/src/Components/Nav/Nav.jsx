import { Input, Space, Button, Layout } from "antd";
import { StarOutlined } from "@ant-design/icons";
import marvelLogo from "../../assets/marvel.png";

const { Header } = Layout;

const Navbar = ({ onSearch, onFavoritesClick }) => {
  return (
    <Header className="ant-layout-header navbar">
      <img src={marvelLogo} alt="Marvel logo" className="navbarLogo" />
      <div className="search">
        <Space>
          <Input.Search
            placeholder="Search characters or comics"
            onSearch={onSearch}
            style={{ width: 400, marginTop: 16 }}
          />
        </Space>
      </div>
      <Button
        icon={<StarOutlined />}
        onClick={onFavoritesClick}
        className="favoritesButton"
      />
    </Header>
  );
};

export default Navbar;
