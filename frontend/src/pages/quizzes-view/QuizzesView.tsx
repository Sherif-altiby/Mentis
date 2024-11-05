import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHook";
import Nav from "../../components/Navbar/Nav";
import Footer from "../../components/footer/Footer";
import Loading from "../loading/Loading";
import { quizeProps } from "../../types/index.types";
import "./QuizzesView.scss";
import { getAllTeacherQuizzes } from "../../utils/teacher";
import { useSearchParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardQuestion } from "@fortawesome/free-solid-svg-icons";
import { setAllQuizzes } from "./quizeSlice";

const QuizzesView = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const teacherId = searchParams.get("id");

  const token = useAppSelector((state) => state.token.token);
  const quizzes = useAppSelector(s => s.quizzes.quizzes)

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)

  const getQuizzes = async (token: string | null) => {

    if(quizzes.length === 0) {
      setLoading(true)
    }

    try {
      const response = await getAllTeacherQuizzes(token);

      if (response && response.length > 0) {

         const filtered = response.filter( (quize: quizeProps) => quize.teacher_id === Number(teacherId) )   ;
         dispatch(setAllQuizzes(filtered));
      }
    } catch (err) { setLoading(false); }
    setLoading(false);
  };

  useEffect(() => {
    if (token) { getQuizzes(token) }

    console.log(quizzes);
  }, [token, teacherId]);

  return (
    <div>
      <Nav setShowMenu={setShow} showIcon={show} />
      {loading ? ( <Loading /> ) : (
        <>
          <h3 className="title"> الاختبارات </h3>
          <div className={`all-quizzes-section `}>
            {quizzes.length > 0 ? (
              quizzes.map((quize, index) => (
                <Link
                  to={`/user/user-subjects/quizzes/questions?query=questions&id=${quize.id}&name=${quize.title}`}
                  className="quize"
                  key={quize.id}
                >
                  <div className="num"> ( {index + 1} )</div>
                  <p> {quize.title} </p>
                  <div className="icon">
                    <FontAwesomeIcon icon={faClipboardQuestion} />
                  </div>
                </Link>
              ))
            ) : (
              <h3>   لا يوجد اختبارات  </h3>
            )}
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default QuizzesView;
