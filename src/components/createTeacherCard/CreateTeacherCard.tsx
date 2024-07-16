 import { Link } from 'react-router-dom';
import './CreateTeacher.scss';

import phiscs from '../../assets/phiscs.jpg'


const CreateTeacherCard = () => {
  return (
    <>
      <Link to="/teacher/mohamedabelnour" className="teacher-card" >
        <div className='content-info' >
          <div className="img">
            <img src={phiscs} alt="" /> 
          </div>
          <h2> أ/ محمد عبد النور </h2>
          <p> كمياء </p>
        </div>
      </Link>
    </>
  )
}

export default CreateTeacherCard