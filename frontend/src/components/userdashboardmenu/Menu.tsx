import './menue.scss'; 
import { menusData } from '../../data/data';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/reduxHook';

const Menu = ( {showMenu, setShowMenu}: {showMenu: boolean, setShowMenu: React.Dispatch<React.SetStateAction<boolean>>} ) => {

  const navigate = useNavigate()

  const appMode = useAppSelector((state) => state.mentisusertheme.mentisUserTheme)

  const hanldleLogout = () => { 
    localStorage.removeItem('mentisID');
    navigate("/")
     window.location.reload()}

  const handleClick = () => { setShowMenu(false)}


  return (
    <div className={`student-dashboard-menu ${appMode}`} >
        <div className={showMenu ? "overlay show" : "overlay"} onClick={() => setShowMenu(false)} ></div>
         <ul className={showMenu ? "show" : ""} >
            {menusData.map((li) => (
                <li key={li.title} >
                    <NavLink to={li.link} onClick={ li.title === "تسجيل الخروج" ? hanldleLogout : handleClick} >
                       <p> {li.title} </p> 
                       <div className="icon"> <li.icon /> </div>
                    </NavLink>
                </li>
            ))}
         </ul>
    </div>
  )
}

export default Menu