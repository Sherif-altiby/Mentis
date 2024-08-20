import CountUp from 'react-countup';
import { useAppSelector } from "../../../redux/reduxHook"
import { Link } from "react-router-dom";
import './TeacherNotes.scss'

const TeacherNotes = () => {

  const appMode = useAppSelector((state) => state.mentisusertheme.mentisUserTheme)

  return (
    <div>
        <h1> المذكرات </h1>
        <div className={`teacher-notes ${appMode} `}>
            <div className="all-teacher-notes">
                <h3> عدد الدروس التي قمت بإضافتها </h3>
                <p><span> مذكرة </span> <span className='counter-up-number'> <CountUp start={0} end={100} duration={2} /> </span>  </p>
            </div>
            <div className="notes-levels">
                <Link to='#'> <p> أولى ثانوي  </p> <p> <span> درس </span> <span className='counter-up-number'> <CountUp start={0} end={100} duration={2} /> </span> </p> </Link>
                <Link to='#'> <p> ثانية ثانوي </p> <p> <span> درس </span> <span className='counter-up-number'> <CountUp start={0} end={100} duration={2} /> </span> </p> </Link>
                <Link to='#'> <p> ثالثة ثانوي </p> <p> <span> درس </span> <span className='counter-up-number'> <CountUp start={0} end={100} duration={2} /> </span> </p> </Link>
            </div>
            <div className="add-note">
              <h3> إضافة درس </h3>
              <div className="inputs">
                  <div className="input">
                    <label htmlFor="name-note"> إسم المذكرة </label>
                    <input type="text" id='name-note'  />
                  </div>
                  <div className="input">
                    <label htmlFor="file"> اضف ملف </label>
                    <input type="file" id='file'   /> 
                  </div>
              </div>
              <div className="btn"> حفظ </div>
            </div>
        </div>
    </div>
  )
}

export default TeacherNotes