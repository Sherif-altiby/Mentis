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
        const response = await getAllTeacherQuizzes(token);

        if(response && response.length > 0) {
            const filtered = response.filter((quize: quizeProps) => quize.teacher_id === Number(teacherId));
            setFilteredQuizzes(filtered);
        } else {
            console.log("Error: No quizzes found or an error occurred");
        }

        dispatch(setLoading(false));
    }

    useEffect(() => {
        if (token) {
            getQuizzes(token);
        }
    }, [token, teacherId]);

  return (
    <div>
     <Nav />
     {loading ? (
        <Loading />
     ) : (
        <div className={`all-quizzes-section ${appMode}`}>
            {filteredQuizzes.length > 0 ? (
                filteredQuizzes.map((quize) => (
                    <Link 
                        to={`/user/user-subjects/quizzes/questions?query=questions&id=${quize.id}&name=${quize.title}`} 
                        className="quize" 
                        key={quize.id}
                    >
                        {quize.title}
                    </Link>
                ))
            ) : (
                <h3>No quizzes available</h3>
            )}
        </div>
      )}
     <Footer />
    </div>
  )
}

export default QuizzesView;
