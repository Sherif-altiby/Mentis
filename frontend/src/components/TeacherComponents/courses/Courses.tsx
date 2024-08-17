import { Link } from 'react-router-dom';
import './Courses.scss';
import { GiCloudUpload } from "react-icons/gi";
// import { MdDelete } from "react-icons/md";
import CountUp from 'react-countup';
import axios from 'axios';
import { useAppSelector } from '../../../redux/reduxHook';
import { useEffect, useState } from 'react';
import CustomLoading from '../../../pages/loading/CustomLoading';
import Message from '../../message/Message';


const Courses = () => {

  const [courseName, setCourseName] = useState("");
  const [courseLevel, setCourseLevel] = useState("");
  const [courseLink, setCourseLink] = useState("");
  const [courseId, setCourseId] = useState("0")
  const [loading, setLoading] = useState(false)

  const [msg, setMsg] = useState(false)

  const token = useAppSelector((state) => state.token.token);

  const teacherId = useAppSelector((state) => state.userInfo.userInfo.user_id);

  useEffect(() => {
      const getCourseId = async () => {
        const respons = await axios.get(`http://127.0.0.1:8000/api/teachers/${teacherId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setCourseId(respons.data.courses[0].id)
        console.log(respons.data.courses[0])
      }    

      getCourseId()
  }, [])

  const createCourse = async () => {
    setLoading(true)
    const response = await axios.post(
        "http://127.0.0.1:8000/api/teachers/courses/contents",
        {
            title: courseName, 
            content_type: "video",
            level: "second",
            course_id: courseId,
            file_path: courseLink
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        }
      );

    if(response.data){
        setLoading(false)
        setMsg(true)
        setCourseName("");
        setCourseLevel("");
        setCourseLink("");
    }
  }

  const handleClick = () => {
     if(courseName.length > 0  && courseLink.length > 0 && courseLevel.length > 0 ){
        createCourse()
     }

  }

  return (
    <div>
             <Message show ={msg} message='تم إضافة الدرس بنجاح' closeMsg={setMsg} />
             <div className="teacher-dashboard-courses">
            <h1> الدروس </h1>
            <div className="courses-amount">
                <h3> عدد الدروس التي قمت بإضافتها </h3>
                <p><span> درس </span> <span className='counter-up-number'> <CountUp start={0} end={100} duration={2} /> </span>  </p>
            </div>
            <div className="courses-levels">
                <Link to='#'> <p> أولى ثانوي  </p> <p> <span> درس </span> <span className='counter-up-number'> <CountUp start={0} end={100} duration={2} /> </span> </p> </Link>
                <Link to='#'> <p> ثانية ثانوي </p> <p> <span> درس </span> <span className='counter-up-number'> <CountUp start={0} end={100} duration={2} /> </span> </p> </Link>
                <Link to='#'> <p> ثالثة ثانوي </p> <p> <span> درس </span> <span className='counter-up-number'> <CountUp start={0} end={100} duration={2} /> </span> </p> </Link>
            </div>
            <div className="add-course-card">
                {loading && (<CustomLoading />)}
                <h3> إضافة درس </h3>

                <div className="input-container">
                    <div className="input">
                        <label htmlFor="course-name"> عنوان الدرس </label>
                        <input type="text" 
                             id='course-name' 
                             onChange={(e) => setCourseName(e.target.value)} 
                             value={courseName}
                          />
                    </div>
                    <div className="input">
                        <label htmlFor="course-link"> رابط الدرس </label>
                        <input type="text" 
                             id='course-link' 
                             onChange={(e) => setCourseLink(e.target.value)} 
                             value={courseLink}
                          />
                    </div>
                </div>
                <div className="input">
                    <label htmlFor="course-level"> إختر الصف </label>
                    <select name='course-level' 
                         id="course-level" 
                         onChange={(e) => setCourseLevel(e.target.value)}
                         value={courseLevel}
                       >
                        <option value=""> </option>
                        <option value="first"> الصف الاول الثانوي </option>
                        <option value="second"> الصف الثاني الثانوي </option>
                        <option value="third"> الصف الثالث الثانوي </option>
                    </select>
                </div>
                <div className="btns">
                    <div className="btn" onClick={handleClick} > 
                        <p> إضافة الدرس  </p> <div className="icon"> <GiCloudUpload /> </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Courses