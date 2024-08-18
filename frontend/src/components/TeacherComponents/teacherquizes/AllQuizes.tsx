import { Link } from "react-router-dom";
import './TeacherQuize.scss'
import { useAppSelector } from "../../../redux/reduxHook";

const AllQuizes = () => {
 
  const appMode = useAppSelector((state) => state.mentisusertheme.mentisUserTheme)

  return (
    <div className={`all-quzes ${appMode}`} >
      <h1> الإختبارات </h1>
         <div className="all-three-qizes">
             <Link to={'specific-garde-quizes'} > الصف الأول الثانوي </Link>
             <Link to={'specific-garde-quizes'} > الصف الثاني الثانوي </Link>
             <Link to={'specific-garde-quizes'} > الصف الثالث الثانوي </Link>
         </div>

         
         <Link className="add-quize-link"  to={'/teacher/dashboard/controle/teacher-add-quize'} > إضافة إختبار </Link>
    </div>
  )
}

export default AllQuizes