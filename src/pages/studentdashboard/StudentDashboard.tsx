import './studentdashboard.scss'
import Nav from "../../components/Navbar/Nav"
import Menu from "../../components/userdashboardmenu/Menu"
import { Outlet } from 'react-router-dom'

const StudentProfile = () => {
  return (
    <div className="student-profile" >
        <Nav />
         <div className="profile-content" >
            <div className="content">
                 <div className="dashborad-content">
                     <Outlet />
                 </div>
             </div>
            <Menu />
         </div>
     </div>
  )
}

export default StudentProfile