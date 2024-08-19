 import { Link } from 'react-router-dom';
import './CreateTeacher.scss';

import phiscs from '../../assets/phiscs.jpg'

import { TeacherProps } from '../../types/index.types';

const CreateTeacherCard = ( {name, id, role, courses}: TeacherProps ) => {
  return (
    <>
      <Link to={`/teacher/${name}?query=${role}&id=${id}`} className="teacher-card" >
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