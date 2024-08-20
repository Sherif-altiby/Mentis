import { Outlet, useLocation, useParams } from 'react-router-dom';
import './Teacher.scss';
import MainHeader from '../../components/mainheader/MainHeader';
import { useAppSelector } from '../../redux/reduxHook';
import Loading from '../loading/Loading';
import { Link } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Teacher = () => {
  const { teacherId } = useParams<{ teacherId: string }>();
  const loading = useAppSelector((state) => state.loading.isLoading)
  const query = useQuery();
  const id = query.get('id');



  return (
    <>
       {loading ? (<Loading />) : (
        <div className='teacher-page'>
           <MainHeader title={teacherId || ''} />
          <div className="teacher-links">
              <Link to={`/user/user-subjects/videos?query=videos&id=${id}`} > الفديوهات </Link>
              <Link to={`/user/user-subjects/notes?query=videos&id=${id}`} > المذكرات </Link>
              <Link to={`/user/user-subjects/quizzes?query=videos&id=${id}`} > الإختبارات </Link>
          </div>
          <Outlet />
        </div>
       )}
    </>
  );
};

export default Teacher;
