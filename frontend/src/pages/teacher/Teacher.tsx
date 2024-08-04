import { useParams } from 'react-router-dom';
import './Teacher.scss';
import MainHeader from '../../components/mainheader/MainHeader';

import { useLocation } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};


const Teacher = () => {

    const { teacherId } = useParams();

    const query = useQuery();
    const searchQuery = query.get('query');
    const id = query.get('id');

    console.log(id, searchQuery)
    
  return (
    <div className='teacher-page' >
        <MainHeader title={teacherId ? teacherId : ''} />
    </div>
  )
}

export default Teacher