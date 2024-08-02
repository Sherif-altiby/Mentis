import './studentdashboard.scss'
import Menu from "../../components/userdashboardmenu/Menu"
import { Outlet } from 'react-router-dom'
import { FaUserAlt } from "react-icons/fa";
import logo from "../../assets/logo-2.png"
import { FaBars } from "react-icons/fa6";
import { useState } from 'react';
import { Link } from 'react-router-dom';

const StudentProfile = () => {

  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
     <div className="student-dashboard-nav">
        <div className="avatar">
           <Link to='setting' className="img"> <FaUserAlt /> </Link>
           <div className="icon" onClick={() => setShowMenu(!showMenu)} > <FaBars /> </div>
        </div>
        
        <Link to="/" className="logo"> <img src={logo} alt="" /> </Link>

     </div>
     <div className="student-profile" >
                 <div className="dashborad-content">
                     <Outlet />
                 </div>
            <Menu showMenu = {showMenu} setShowMenu={setShowMenu} />
     </div>
    </>
  )
}

export default StudentProfile