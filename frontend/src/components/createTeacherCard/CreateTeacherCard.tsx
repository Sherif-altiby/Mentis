 import { Link } from 'react-router-dom';
import './CreateTeacher.scss';

import phiscs from '../../assets/phiscs.jpg'

import { TeacherProps } from '../../types/index.types';
import { useAppSelector } from '../../redux/reduxHook';

const CreateTeacherCard = ( {name, id, role, courses}: TeacherProps ) => {

  const appMode = useAppSelector((state) => state.mentisusertheme.mentisUserTheme)

  return (
    <>
      <Link to={`/teacher/${name}?query=${role}&id=${id}&subject=${courses[0].title}`} className={`teacher-card ${appMode}`} >
        <div className='content-info' >
          <div className="img">
            <img src={phiscs} alt="" /> 
          </div>
          <h2>  {name} </h2>
        </div>
      </Link>
    </>
  )
}

export default CreateTeacherCard