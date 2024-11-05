import "./Home.scss";

import { Outlet } from "react-router-dom";
import Nav from "../../components/Navbar/Nav";
import Footer from "../../components/footer/Footer";
import { useState } from "react";


const Home = () => {
  
  const [showMenu, setShowMenu] = useState(false)


  return (
    <div className={`home-container `}>
      <Nav setShowMenu={setShowMenu} showIcon={showMenu} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;
