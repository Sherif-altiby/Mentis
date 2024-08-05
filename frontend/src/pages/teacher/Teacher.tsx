import { useParams } from 'react-router-dom';
import './Teacher.scss';
import MainHeader from '../../components/mainheader/MainHeader';

import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};


const Teacher = () => {

    const { teacherId } = useParams();

    const query = useQuery();
    const searchQuery = query.get('query');
    const id = query.get('id');

    
  return (
    <div className='teacher-page' >
        <MainHeader title={teacherId ? teacherId : ''} />
        <div className="all-levels-container">
          <h3> إختر الصف </h3>
          <div className="levels">
            <Link to="first-grade" className="level"> الصف الاول الثانوي </Link>
            <Link to="second-grade" className="level"> الصف الثاني الثانوي </Link>
            <Link to="third-grade" className="level"> الصف الثالث الثانوي </Link>
          </div>
        </div>
    </div>
  )
}

export default Teacher