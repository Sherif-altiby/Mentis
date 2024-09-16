import { Outlet, useLocation, useParams } from 'react-router-dom';
import './Teacher.scss';
import { useAppSelector } from '../../redux/reduxHook';
import Loading from '../loading/Loading';
import { Link } from 'react-router-dom';
import img from "../../assets/phiscs.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCircleQuestion, faNotesMedical, faVideoSlash } from '@fortawesome/free-solid-svg-icons';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Teacher = () => {
  const { teacherId } = useParams<{ teacherId: string }>();
  const loading = useAppSelector((state) => state.loading.isLoading)
  const query = useQuery();
  const id = query.get('id');
  const title = query.get('subject')

  return (
    <>
       {loading ? (<Loading />) : (
        <div className='teacher-page'>

         <div className="teaher__aboout">
              <div className="teacher__info">
                  <div className="img"> <img src={img} alt="" /> </div>
                  <h3> {teacherId} </h3>
                  <p> {title} </p>
              </div>
              <div className="teacher__desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, eveniet. Earum qui, omnis quasi quia facilis laboriosam temporibus quas natus magnam, modi laudantium dolor deleniti tempore fugit quos. Odio, rerum?
              </div>
          </div>

          <div className="teacher-links">
              <Link to={`/user/user-subjects/videos?query=videos&id=${id}`} >
                   <div className="icon"> <FontAwesomeIcon icon={faVideoSlash} /> </div>
                   <p> الفديوهات </p>  
              </Link>
              <Link to={`/user/user-subjects/notes?query=videos&id=${id}`} > 
                   <div className="icon"> <FontAwesomeIcon icon={faNotesMedical} /> </div>
                   <p> المذكرات </p> 
              </Link>
              <Link to={`/user/user-subjects/quizzes?query=videos&id=${id}`} > 
                   <div className="icon"> <FontAwesomeIcon icon={faFileCircleQuestion} /></div>
                   <p> الإختبارات </p> 
              </Link>
          </div>
          <Outlet />
        </div>
       )}
    </>
  );
};

export default Teacher;
