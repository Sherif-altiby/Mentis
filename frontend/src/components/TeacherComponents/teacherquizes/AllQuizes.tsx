import { Link } from "react-router-dom";
import './TeacherQuize.scss'
import { useAppSelector } from "../../../redux/reduxHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { FaFileCircleQuestion } from "react-icons/fa6";


const AllQuizes = () => {
 
  const appMode = useAppSelector((state) => state.mentisusertheme.mentisUserTheme);
  

  return (
    <div className={`all-quzes ${appMode}`} >
      <h1> الإختبارات </h1>
         <div className="all-three-qizes">
             <Link to={'specific-garde-quizes?query=level&level=first'}  >  <div className="icon"> <FontAwesomeIcon icon={faUserGraduate} /> </div>  <p> الصف الأول الثانوي   </p>  </Link>
             <Link to={'specific-garde-quizes?query=level&level=second'} > <div className="icon"> <FontAwesomeIcon icon={faUserGraduate} /> </div>   <p> الصف الثاني الثانوي </p>  </Link>
             <Link to={'specific-garde-quizes?query=level&level=third'}  > <div className="icon"> <FontAwesomeIcon icon={faUserGraduate} /> </div>   <p> الصف الثالث الثانوي </p>  </Link>
         </div>

         
         <Link className="add-quize-link"  to={'/teacher/dashboard/controle/teacher-add-quize'} > 
          <div className="icon"> <FaFileCircleQuestion /> </div>
          <p> إضافة إختبار  </p>
         </Link>
    </div>
  )
}

export default AllQuizes