 import './Admin.scss'
 import { IoAddCircle } from "react-icons/io5";
 import { MdDelete } from "react-icons/md";
import { Link, Outlet } from 'react-router-dom';



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
  return (
    <div className='admin-page' >
          <div className="admin-menu">
              {data.map(item => (
                    <div className='manu-link' key={item.id} >
                         <Link to={item.link} > <p> {item.title} </p>  <div className="icon"> <item.icon /> </div>  </Link>
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