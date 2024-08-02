import { Link } from 'react-router-dom';
import './Courses.scss';
import { GiCloudUpload } from "react-icons/gi";
// import { MdDelete } from "react-icons/md";
import CountUp from 'react-countup';


const Courses = () => {
  return (
    <div>
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
                <h3> إضافة درس </h3>

                <div className="input-container">
                    <div className="input">
                        <label htmlFor="course-name"> عنوان الدرس </label>
                        <input type="text" id='course-name' />
                    </div>
                    <div className="input">
                        <label htmlFor="course-link"> رابط الدرس </label>
                        <input type="text" id='course-link' />
                    </div>
                </div>
                <div className="input">
                    <label htmlFor="course-level"> إختر الصف </label>
                    <select name='course-level' id="course-level">
                        <option value="1"> الصف الاول الثانوي </option>
                        <option value="2"> الصف الثاني الثانوي </option>
                        <option value="3"> الصف الثالث الثانوي </option>
                    </select>
                </div>
                <div className="btns">
                    <div className="btn"> <p> إضافة الدرس  </p> <div className="icon"> <GiCloudUpload /> </div> </div>
                    {/* <div className="btn"> <p> حذف درس  </p> <div className="icon"> <MdDelete /> </div> </div> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Courses