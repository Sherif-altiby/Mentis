import './studentdashboard.scss'
import Footer from "../../components/footer/Footer"
import Nav from "../../components/Navbar/Nav"
import Menu from "../../components/userdashboardmenu/Menu"

const StudentProfile = () => {
  return (
    <div className="student-profile" >
        <Nav />
         <div className="profile-content" >
            <div className="content">
                 <div className="dashborad-content">
                      <h1>Content</h1> 
                 <h1>Content</h1> 
                 <h1>Content</h1> 
                 <h1>Content</h1> 
                 <h1>Content</h1> 
                 <h1>Content</h1> 
                 <h1>Content</h1> 
                 <h1>Content</h1> 
                 <h1>Content</h1> 
                 <h1>Content</h1> 
                 <h1>Content</h1> 
                 <h1>Content</h1> 

                 </div>
                 <Footer />
             </div>
            <Menu />
         </div>
     </div>
  )
}

export default StudentProfile