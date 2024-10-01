import "./Home.scss";

import { Outlet } from "react-router-dom";
import Nav from "../../components/Navbar/Nav";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <div className={`home-container `}>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;
