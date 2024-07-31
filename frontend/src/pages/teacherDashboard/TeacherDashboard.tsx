import { FaUserAlt } from 'react-icons/fa'
import './TeacherDashboard.scss'

import logo from '../../assets/logo-2.png'
import { useState } from 'react'
import { FaBars } from 'react-icons/fa6'

import { NavLink, Outlet } from 'react-router-dom'
import { TeacherDashboardData } from '../../data/data'

const TeacherDashboard = () => {

    const [showMenu, setShowMenu] = useState(false)

  return (
    <div>
          <div className="student-dashboard-nav">
             <div className="avatar">
                <div className="img"> <FaUserAlt /> </div>
                <div className="icon" onClick={() => setShowMenu(!showMenu)} > <FaBars /> </div>
             </div> 
             <div className="logo"> <img src={logo} alt="" /> </div>
          </div>

          <div className="teacher-dashboard">
            <div className={showMenu ? "overlay show" : "overlay"} onClick={() => setShowMenu(false)} ></div>
              <div className={showMenu ? "teacher-dashboard-menu show" : "teacher-dashboard-menu"}>
                  {TeacherDashboardData.map(link => (
                    <div key={link.id}  className='link-container'>
                       <NavLink to={link.link} onClick={() => setShowMenu(false)} >
                            <p> {link.title} </p> 
                            <div className="icon"> <link.icon /> </div> 
                         </NavLink>
                    </div>
                  ))}
              </div>
              <div className="teacher-dashboard-content">
                   <Outlet />
              </div>
          </div>
    </div>
  )
}

export default TeacherDashboard