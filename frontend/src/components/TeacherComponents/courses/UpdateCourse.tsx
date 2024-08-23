import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/reduxHook';
import './Courses.scss';
import { useSearchParams } from 'react-router-dom';
import Nav from '../../Navbar/Nav';
import Footer from '../../footer/Footer';
import { getTeacherAllCourses } from '../../../utils/teacher';
import { setLoading } from '../../../pages/loading/Loadingslice';
import Loading from '../../../pages/loading/Loading';
import { courseProps } from '../../../types/index.types';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa6";


const UpdateCourse = () => {
    const dispatch = useAppDispatch();

    const appMode = useAppSelector((state) => state.mentisusertheme.mentisUserTheme);
    const userId  = useAppSelector((state) => state.userInfo.userInfo.user_id);
    const token = useAppSelector((state) => state.token.token);
    const loading = useAppSelector((state) => state.loading.isLoading);

    const [teacherCourses, setTeacherCourses] = useState<any>(null); // Fixed variable name

    const [searchParams] = useSearchParams(); // Removed unnecessary `setSearchParams`
   
    const level = searchParams.get("level");

    const headerText = level === "first" ? "الأول" : level === "second" ? "الثاني" : "الثالث";

    useEffect(() => {
        const getCourses = async () => {
            dispatch(setLoading(true));
            try {
                const response = await getTeacherAllCourses(userId, token, level);

                console.log(response);

                setTeacherCourses(response.data);  
            } catch (error) {
                console.error('Error fetching courses:', error);
                dispatch(setLoading(false));
            } finally {
                dispatch(setLoading(false));
            }
        };

        getCourses();
    }, [userId, token, level]);  

    return (
        <>
            <Nav />
            {loading ? (
                <Loading />
            ) : (
                <div className={`update-course-page ${appMode}`}>
                    <h1> الصف {headerText} الثانووي </h1>
                    <div className="all-courses-container">
                          {teacherCourses &&  (
                            teacherCourses.map((course: courseProps) => (
                                <>
                                   <div key={course.course_id} className="course-card">
                                       <p> {course.title} </p>

                                       <div className="icons">
                                           <div className="icon">
                                               <p> حذف </p>
                                               <div className="btn-icon"> <MdDelete /> </div>
                                           </div>
                                           <div className="icon">
                                               <p> تعديل </p>
                                               <div className="btn-icon"> <FaPen /> </div>
                                           </div>
                                       </div>
                                   </div>
                                </>
                            ))
                          )}
                          {!teacherCourses && ( <h3> لا يوجد دروس </h3> ) }
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}

export default UpdateCourse;
