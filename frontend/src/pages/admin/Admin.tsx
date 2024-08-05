 import { FaUserAlt } from 'react-icons/fa';
import './Admin.scss'
import { Link, Outlet } from 'react-router-dom';
import logo from '../../assets/logo-2.png'
import { useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import { adminData } from '../../data/data';





const Admin = () => {

  const [showMenu, setShowMenu] = useState(false)


  return (
    <div className='admin-page' >
      <div className={showMenu ? "overlay show" : "overlay"} onClick={() => {setShowMenu(false)}} ></div>
       <div className="student-dashboard-nav">
             <div className="avatar">
                <Link to='settings' className="img"> <FaUserAlt /> </Link>
                <div className="icon" onClick={() => setShowMenu(!showMenu)} > <FaBars /> </div>
             </div> 
             <Link to="/" className="logo"> <img src={logo} alt="" /> </Link>
          </div>
          <div className={showMenu ? "admin-menu show" : "admin-menu"}>
              {adminData.map(item => (
                    <div className='manu-link' key={item.id} onClick={() => setShowMenu(false)} >
                         <NavLink to={item.link}  > 
                            <p> {item.title} </p>  
                            <div className="icon"> <item.icon /> </div>  
                          </NavLink>
                    </div>
                ))}
          </div>
          <div className="admin-dashboard">
            <Outlet />
          </div>
    </div>
  )
}

export default Admin