import './menue.scss'; 
import { menusData } from '../../data/data';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <div className='student-dashboard-menu' >
         <ul>
            {menusData.map((li) => (
                <li key={li.title} >
                    <NavLink to={li.link} > <p> {li.title} </p> <div className="icon"> <li.icon /> </div> </NavLink>
                </li>
            ))}
         </ul>
    </div>
  )
}

export default Menu