import "./Nav.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { FaRegCompass } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";


import logo from "../../assets/logo-2.png";
import { useState } from "react";

const Nav = () => {

  const navigate = useNavigate()

  const isLogedIn = localStorage.getItem("mentisID");

  const [showMenu, setShowMenu] = useState(false);

  const handleNavigate = ( path: string ) => {
    setShowMenu(false)
    navigate(path)
  }

  const handleLoout = () => {
     localStorage.removeItem('mentisID');
     navigate("/");
     window.location.reload()
  }

  return (
    <nav>
      <div className="nav">
        {isLogedIn ? (
      <>  
          <div className="nav-user" onClick={() => setShowMenu(!showMenu)} >
               <div className="user-img"> <FaCircleUser /> </div>
               <div className="user-name"> sherif altiby </div>
               <div className="user-notifications">
                   <IoNotifications />
                   <span> 0 </span>
               </div>
          </div>
          <div className={`user-menu ${showMenu ? 'show' : ' ' }`}>
              <div className="user-menu-link" onClick={() => handleNavigate("/user/user-profile/dashboard")} > <p>لوحة التحكم </p> <div className="icon"> <FaRegCompass /> </div> </div>
              <div className="user-menu-link" onClick={() => handleNavigate("/user/user-profile/setting")} > <p>  اللإعدادات </p> <div className="icon"> <IoSettings /> </div> </div>
              <div className="user-menu-link" onClick={handleLoout} > <p> تسجيل الخروج </p> <div className="icon"> <RiLogoutCircleLine /> </div> </div>
          </div>
      </>
        ) : (
          <div className="signin">
            <div className="btn">
              <Link to="/signup"> تسجيل الدخول </Link>
            </div>
          </div>
        )}
        <div className="logo">
          <Link to="/">
            <div className="img">
              <img src={logo} alt="" />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
