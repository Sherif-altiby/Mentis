import "./Admin.scss";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { adminData } from "../../data/data";
import Nav from "../../components/Navbar/Nav";

const Admin = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={`admin-page `}>
      <Nav showIcon={true} setShowMenu={setShowMenu} />
      <div
        className={`overlay ${showMenu ? "show" : ""}`}
        onClick={() => setShowMenu(false)}
      ></div>
      <div className={`${showMenu ? "admin-menu show" : "admin-menu"}  `}>
        {adminData.map((item) => (
          <div
            className="manu-link"
            key={item.title}
            onClick={() => setShowMenu(false)}
          >
            <NavLink to={item.link}>
              <p> {item.title} </p>
              <div className="icon">
                <item.icon />
              </div>
            </NavLink>
          </div>
        ))}
      </div>
      <div className="admin-dashboard">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
