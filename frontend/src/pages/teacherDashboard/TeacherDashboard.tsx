import "./TeacherDashboard.scss";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { TeacherDashboardData } from "../../data/data";
import Nav from "../../components/Navbar/Nav";

const TeacherDashboard = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={`teacher-dashboard-container `}>
      <Nav />
      <div className="teacher-dashboard">
        <div
          className={showMenu ? "overlay show" : "overlay"}
          onClick={() => setShowMenu(false)}
        ></div>
        <div
          className={`${
            showMenu ? "teacher-dashboard-menu show" : "teacher-dashboard-menu"
          }  `}
        >
          {TeacherDashboardData.map((link) => (
            <div key={link.title} className="link-container">
              <NavLink to={link.link} onClick={() => setShowMenu(false)}>
                <p> {link.title} </p>
                <div className="icon">
                  {" "}
                  <link.icon />{" "}
                </div>
              </NavLink>
            </div>
          ))}
        </div>
        <div className="teacher-dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
