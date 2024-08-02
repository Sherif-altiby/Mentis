import { useParams } from 'react-router-dom';
import './Teacher.scss';
import MainHeader from '../../components/mainheader/MainHeader';

const Teacher = () => {

    const { teacherId } = useParams();
    
  return (
    <div className='teacher-page' >
        <MainHeader title={teacherId ? teacherId : ''} />
    </div>
  )
}

export default Teacher