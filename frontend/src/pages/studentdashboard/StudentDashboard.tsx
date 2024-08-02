import './studentdashboard.scss'
import Menu from "../../components/userdashboardmenu/Menu"
import { Outlet } from 'react-router-dom'
import { FaUserAlt } from "react-icons/fa";
// import { IoIosNotifications } from "react-icons/io";
// import { FaMoon } from "react-icons/fa";
import logo from "../../assets/logo-2.png"
import { FaBars } from "react-icons/fa6";
import { useState } from 'react';




const StudentProfile = () => {

  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
     <div className="student-dashboard-nav">
        <div className="avatar">
           <div className="img"> <FaUserAlt /> </div>
           {/* <div className="notifications">
             <IoIosNotifications />
             <span> 0 </span>
           </div> */}
           {/* <div className="dark-mode"> <FaMoon />  </div> */}
           <div className="icon" onClick={() => setShowMenu(!showMenu)} > <FaBars /> </div>
        </div>
        
        <div className="logo">
          <img src={logo} alt="" />

        </div>

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