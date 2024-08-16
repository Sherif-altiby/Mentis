import { useParams } from 'react-router-dom';
import './Teacher.scss';
import MainHeader from '../../components/mainheader/MainHeader';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTeacherAllCourses } from '../../utils/teacher';
import { useAppSelector,useAppDispatch } from '../../redux/reduxHook';
import { setLoading } from '../loading/Loadingslice';
import Loading from '../loading/Loading';
import { Link } from 'react-router-dom';
import { setVideoId } from '../videoplayer/videoSlice';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};


const Teacher = () => {
  const { teacherId } = useParams<{ teacherId: string }>();
  const [courses, setCourses] = useState<any[]>([]);
  const query = useQuery();
  const id = query.get('id');
  const token = useAppSelector((state) => state.token.token);
  const loading = useAppSelector((state) => state.loading.isLoading)
  const dispatch = useAppDispatch()
  

  useEffect(() => {
    const fetchCourses = async () => {
      dispatch(setLoading(true))
      if (id && token) {
        try {
          const courses = await getTeacherAllCourses(id, token, "second");
          console.log(courses);
          setCourses(courses.data);
          dispatch(setLoading(false))
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      }
    };

    fetchCourses();
  }, [id, token]);

  return (
    <>
       {loading ? (<Loading />) : (
        <div className='teacher-page'>
        <MainHeader title={teacherId || ''} />
        <div className="all-courses">
          {courses && courses.map((course) => (
            <Link to="/user/user-subjects/video" key={course.id} className="course" onClick={() => dispatch(setVideoId(course.file_path))} >
              <h3>{course.title}</h3>
            </Link>
          ))}
        </div>
      </div>
       )}
    </>
  );
};

export default Teacher;
