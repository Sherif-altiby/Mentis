 import { FaUserAlt } from 'react-icons/fa';
import './Admin.scss'
 import { IoAddCircle } from "react-icons/io5";
 import { MdDelete } from "react-icons/md";
import { Link, Outlet } from 'react-router-dom';
import logo from '../../assets/logo-2.png'
import { useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';



 const data = [
    {
        id: 1,
        title: "إضافة مدرس",
        icon: IoAddCircle,
        link: 'add-teacher'
    },
    {
        id: 2,
        title: "حذف مدرس",
        icon: MdDelete,
        link: 'delete-teacher'
    }
 ]

const Admin = () => {

  const [showMenu, setShowMenu] = useState(false)


  return (
    <div className='admin-page' >
       <div className="student-dashboard-nav">
             <div className="avatar">
                <Link to='settings' className="img"> <FaUserAlt /> </Link>
                <div className="icon" onClick={() => setShowMenu(!showMenu)} > <FaBars /> </div>
             </div> 
             <Link to="/" className="logo"> <img src={logo} alt="" /> </Link>
          </div>
          <div className="admin-menu">
              {data.map(item => (
                    <div className='manu-link' key={item.id} >
                         <NavLink to={item.link} > <p> {item.title} </p>  <div className="icon"> <item.icon /> </div>  </NavLink>
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