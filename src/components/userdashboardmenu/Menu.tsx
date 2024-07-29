import './menue.scss'; 
import { menusData } from '../../data/data';
import { NavLink } from 'react-router-dom';

const Menu = () => {

  const hanldleLogout = () => { localStorage.removeItem('mentisID'); window.location.reload()}

  const handleClick = () => {}

  return (
    <div className='student-dashboard-menu' >
         <ul>
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