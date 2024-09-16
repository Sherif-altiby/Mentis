import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHook";
import { setLoading } from "../loading/Loadingslice";
import Nav from "../../components/Navbar/Nav";
import Footer from "../../components/footer/Footer";
import Loading from "../loading/Loading";
import { quizeProps } from "../../types/index.types";
import './QuizzesView.scss';
import { getAllTeacherQuizzes } from "../../utils/teacher";
import { useSearchParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardQuestion } from "@fortawesome/free-solid-svg-icons";

const QuizzesView = () => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const teacherId = searchParams.get('id'); 

    const appMode = useAppSelector((state) => state.mentisusertheme.mentisUserTheme);
    const loading = useAppSelector((state) => state.loading.isLoading);
    const token   = useAppSelector((state) => state.token.token);

    const [filteredQuizzes, setFilteredQuizzes] = useState<quizeProps[]>([]);

    const getQuizzes = async (token: string | null) => {
        dispatch(setLoading(true));
        
        try{
            const response = await getAllTeacherQuizzes(token);
            if(response && response.length > 0) {
                const filtered = response.filter((quize: quizeProps) => quize.teacher_id === Number(teacherId));
                setFilteredQuizzes(filtered);
            }  
        }catch(err){
            console.log("errorr")
            dispatch(setLoading(false));

        }  
        dispatch(setLoading(false));
    }

    useEffect(() => {
        if (token) {
            getQuizzes(token);
        }

        console.log(filteredQuizzes)

    }, [token, teacherId]);

  return (
    <div>
     <Nav />
     {loading ? (
        <Loading />
     ) : (
        <>
        <h3 className="title"> الاختبارات </h3>
        <div className={`all-quizzes-section ${appMode}`}>
            {filteredQuizzes.length > 0 ? (
                filteredQuizzes.map((quize, index) => (
                    <Link 
                        to={`/user/user-subjects/quizzes/questions?query=questions&id=${quize.id}&name=${quize.title}`} 
                        className="quize" 
                        key={quize.id}
                    >
                        <div className="num"> ( {index + 1} )</div>
                        <p> {quize.title} </p>
                         <div className="icon"> <FontAwesomeIcon icon={faClipboardQuestion} /> </div>
                    </Link>
                ))
            ) : (
                <h3>No quizzes available</h3>
            )}
        </div>
        </>
      )}
     <Footer />
    </div>
  )
}

export default QuizzesView;
