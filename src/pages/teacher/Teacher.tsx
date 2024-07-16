import { useParams } from 'react-router-dom';
import './Teacher.scss';

const Teacher = () => {

    const { teacherId } = useParams();
    
  return (
    <div>
        <h1> {teacherId} </h1>
    </div>
  )
}

export default Teacher