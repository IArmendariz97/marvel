import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "./Views/Home/Home";
import Nav from "./Components/Nav/Nav";

const Router = () => {
  const location = useLocation();

  return (
    <BrowserRouter>
      {location.pathname !== "/" && <Nav />}
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
