import { useSearchParams } from 'react-router-dom';
import './TeacherQuize.scss';
import { useEffect, useState } from 'react';
import { quizeProps } from '../../../types/index.types';
import { useAppSelector, useAppDispatch } from '../../../redux/reduxHook';
import { getAllTeacherQuizzes } from '../../../utils/teacher';
import { setLoading } from '../../../pages/loading/Loadingslice';
import Nav from '../../Navbar/Nav';
import Footer from '../../footer/Footer';
import Loading from '../../../pages/loading/Loading';

const LevelQuizzes = () => {

    const [params]  = useSearchParams();
    const dispatch = useAppDispatch()

    const level = params.get('level');
    const [filteredQuizzes, setFilteredQuizzes] = useState<quizeProps[]>([]);

    const teacherId = useAppSelector((state) => state.userInfo.userInfo.user_id);
    const token = useAppSelector((state) => state.token.token);
    const loading = useAppSelector((state) => state.loading.isLoading);

    const levelTitle = level === 'first' ? 'الأول' : level === 'second' ? 'الثاني' : 'الثالث';

    const getQuizzes = async (token: string | null) => {
        dispatch(setLoading(true));
        const response = await getAllTeacherQuizzes(token);

        if(response && response.length > 0) {
            const filtered = response.filter((quize: quizeProps) => quize.teacher_id === Number(teacherId) && quize.level === level);
            setFilteredQuizzes(filtered);
            dispatch(setLoading(false));
        }  

        dispatch(setLoading(false));
    }

    useEffect(() => {
        if (token) {
            getQuizzes(token);
        }
        
    }, [token, teacherId]);
    console.log(filteredQuizzes)

  return (
    <div>
        <Nav />
            <div className="level-quizzes">
               <div className="level-title">  الصف {levelTitle} الثانوي</div>
               <div className="level-quizzes-container">
                  {loading ? (<Loading />) : (
                    <div className="quizzes">
                         {filteredQuizzes.length > 0 ? (
                            filteredQuizzes.map((quize) => (
                             <div className="quiz" key={quize.id} > 
                                <h3> {quize.title} </h3> 
                             </div>
                            ))
                         ) : ( <h1> لا يوجد الإختبارات </h1> )}
                    </div>
                  )}
               </div>
            </div>
        <Footer />
    </div>
  )
}

export default LevelQuizzes