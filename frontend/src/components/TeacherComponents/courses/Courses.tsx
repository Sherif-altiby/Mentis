import { Link } from 'react-router-dom';
import './Courses.scss';
import { GiCloudUpload } from "react-icons/gi";
import { MdDelete } from "react-icons/md";


const Courses = () => {
  return (
    <div>
        <div className="teacher-dashboard-courses">
            <h1> الدروس </h1>
            <div className="courses-amount">
                <h3> عدد الدروس التي قمت برفعها </h3>
                <p><span> درس </span> <span>0</span>  </p>
            </div>
            <div className="courses-levels">
                <Link to='#'> <p> أولى ثانوي  </p> <p> <span> درس </span> <span> 0 </span> </p> </Link>
                <Link to='#'> <p> ثانية ثانوي </p> <p> <span> درس </span> <span> 0 </span> </p> </Link>
                <Link to='#'> <p> ثالثة ثانوي </p> <p> <span> درس </span> <span> 0 </span> </p> </Link>
            </div>
            <div className="btns">
                <div className="btn"> <p> إضافة درس  </p> <div className="icon"> <GiCloudUpload /> </div> </div>
                <div className="btn"> <p> حذف درس  </p> <div className="icon"> <MdDelete /> </div> </div>
            </div>
        </div>
    </div>
  )
}

export default Courses