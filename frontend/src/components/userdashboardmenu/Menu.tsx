import "./menue.scss";
import { menusData } from "../../data/data";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/reduxHook";
import { logout } from "../../utils/api";

const Menu = ({
  showMenu,
  setShowMenu,
}: {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();

  const token = useAppSelector((state) => state.token.token) || "";

  const hanldleLogout = () => {
    logout(token);
    navigate("/");
    window.location.reload();
  };

  const handleClick = () => {
    setShowMenu(false);
  };

  return (
    <div className={`student-dashboard-menu `}>
      <div
        className={showMenu ? "overlay show" : "overlay"}
        onClick={() => setShowMenu(false)}
      ></div>
      <ul className={showMenu ? "show" : ""}>
        {menusData.map((li) => (
          <li key={li.title}>
            <NavLink
              to={li.link}
              onClick={
                li.title === "تسجيل الخروج" ? hanldleLogout : handleClick
              }
            >
              <p> {li.title} </p>
              <div className="icon">
                {" "}
                <li.icon />{" "}
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
