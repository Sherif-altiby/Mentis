import './studentdashboard.scss'
import Menu from "../../components/userdashboardmenu/Menu"
import { Outlet } from 'react-router-dom'

const StudentProfile = () => {
  return (
    <div className="student-profile" >
                 <div className="dashborad-content">
                     <Outlet />
                 </div>
            <Menu />
     </div>
  )
}

export default StudentProfile