 import { Link } from 'react-router-dom';
import './CreateTeacher.scss';

import phiscs from '../../assets/phiscs.jpg'

import { TeacherProps } from '../../types/index.types';
import { useAppSelector } from '../../redux/reduxHook';

const CreateTeacherCard = ( {name, id, role, courses}: TeacherProps ) => {

  const appMode = useAppSelector((state) => state.mentisusertheme.mentisUserTheme)

  return (
    <>
      <Link to={`/teacher/${name}?query=${role}&id=${id}`} className={`teacher-card ${appMode}`} >
        <div className='content-info' >
          <div className="img">
            <img src={phiscs} alt="" /> 
          </div>
          <h2>  {name} </h2>
          <p> {courses[0]?.title} </p>
        </div>
      </Link>
    </>
  )
}

export default CreateTeacherCard