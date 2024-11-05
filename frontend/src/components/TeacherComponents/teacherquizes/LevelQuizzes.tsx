import { useSearchParams } from 'react-router-dom';
import './TeacherQuize.scss';
import { useEffect, useState } from 'react';
import { quizeProps } from '../../../types/index.types';
import { useAppSelector } from '../../../redux/reduxHook';
import { getAllTeacherQuizzes } from '../../../utils/teacher';
import Nav from '../../Navbar/Nav';
import Footer from '../../footer/Footer';
import Loading from '../../../pages/loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const LevelQuizzes = () => {

    const [params]  = useSearchParams();

    const level = params.get('level');
    const [filteredQuizzes, setFilteredQuizzes] = useState<quizeProps[]>([]);

    const teacherId = useAppSelector((state) => state.userInfo.userInfo.user_id);
    const token = useAppSelector((state) => state.token.token);
    const [loading, setLoading] = useState(false)

    const levelTitle = level === 'first' ? 'الأول' : level === 'second' ? 'الثاني' : 'الثالث';

    const getQuizzes = async (token: string | null) => {
       setLoading(true)
       
       try{
        const response = await getAllTeacherQuizzes(token);

        if(response && response.length > 0) {
            const filtered = response.filter((quize: quizeProps) => quize.teacher_id === Number(teacherId) && quize.level === level);
            setFilteredQuizzes(filtered);
            setLoading(false)
         }  
        } catch (err) {setLoading(false);}

    }

    useEffect(() => { if (token) { getQuizzes(token) } }, [token, teacherId]);
    console.log(filteredQuizzes)

  return (
    <div>
        <Nav setShowMenu={setLoading} showIcon={false} />
            <div className="level-quizzes">
               <div className="level-title">  الصف {levelTitle} الثانوي</div>
               <div className="level-quizzes-container">
                  {loading ? (<Loading />) : (
                    <div className="quizzes">
                         {filteredQuizzes.length > 0 ? (
                            filteredQuizzes.map((quize, index) => (
                             <div className="quiz" key={quize.id} > 
                                 <div className="text">
                                    <div className="num"> ({index + 1}) </div>
                                   <h3> {quize.title} </h3>
                                </div> 
                                <div className="controle">
                                      {/* <div className="edite">
                                           <p> تعديل </p>
                                           <div className="icon"> <FontAwesomeIcon icon={faFilePen} /> </div>
                                      </div> */}
                                      <div className="edite">
                                           <p> مسح </p>
                                           <div className="icon"> <FontAwesomeIcon icon={faTrash} /> </div>
                                      </div>
                                </div>
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