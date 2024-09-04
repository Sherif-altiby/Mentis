import { useEffect, useRef, useState } from 'react';
import ReactConfetti from 'react-confetti';
import sound from '../../assets/clap.mp3';
import { useSearchParams } from 'react-router-dom';
import { getQuizQuestions } from '../../utils/teacher';
import { useAppSelector, useAppDispatch } from '../../redux/reduxHook';
import Nav from '../../components/Navbar/Nav';
import Footer from '../../components/footer/Footer';
import './QuizzesView.scss';
import { setLoading } from '../loading/Loadingslice';
import Loading from '../loading/Loading';

interface QuestionProps {
  correct_answer: string;
  id: number;
  question: string;
  options: string;
  quiz_id: number;
}

interface QuestionAnswer {
  id: number;
  answer: string;
}

const QuizzesViewQuestions = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const quizId = Number(searchParams.get('id'));
  const quizTitle = searchParams.get('name');

  const [windowDimension, setDimension] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [showFireworks, setShowFireworks] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState(100);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const token = useAppSelector((state) => state.token.token);
  const loading = useAppSelector((state) => state.loading.isLoading);

  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<QuestionAnswer[]>([]); 

  const detectSize = () => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener('resize', detectSize);
    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, []);

  useEffect(() => {
    if (showFireworks) {
      audioRef.current?.play();

      const interval = setInterval(() => {
        setConfettiPieces((pieces) => Math.max(0, pieces - 100));
      }, 3000);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        setShowFireworks(false);
        setConfettiPieces(100);
      }, 10000);

      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    }
  }, [showFireworks]);

  const getQuestions = async (token: string | null, id: number) => {
    if (token) {
      dispatch(setLoading(true));
      const fetchedQuestions = await getQuizQuestions(token, id);
      setQuestions(fetchedQuestions);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getQuestions(token, quizId);
  }, [quizId, token]);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setSelectedAnswers((prev) => {
      const updatedAnswers = prev.filter((item) => item.id !== questionId);
      return [...updatedAnswers, { id: questionId, answer }];
    });
  };

  const handleSend = () => {
    console.log(selectedAnswers);
  };

  return (
    <div className="student-questions">
      <Nav />
      {showFireworks && (
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.height}
          numberOfPieces={confettiPieces}
          tweenDuration={1000}
        />
      )}
      <audio ref={audioRef} src={sound} />

      <div className="quiz-questions-container">
        <h2>{quizTitle}</h2>

        {loading ? (
          <Loading />
        ) : questions.length > 0 ? (
          questions.map((question) => {
            const options = JSON.parse(question.options) as {
              a: string;
              b: string;
              c: string;
              d: string;
            };

            return (
              <div key={question.id} className="question">
                <h3>{question.question}</h3>
                <div className="answers">
                  <div className="answer">
                    <label htmlFor={`${question.id}-a`}>
                      <span></span> {options.a}
                    </label>
                    <input
                      type="radio"
                      name={`${question.id}`}
                      id={`${question.id}-a`}
                      value={options.a}
                      onChange={() => handleAnswerChange(question.id, 'a')}
                    />
                  </div>
                  <div className="answer">
                    <label htmlFor={`${question.id}-b`}>
                      <span></span> {options.b}
                    </label>
                    <input
                      type="radio"
                      name={`${question.id}`}
                      id={`${question.id}-b`}
                      value={options.b}
                      onChange={() => handleAnswerChange(question.id, 'b')}
                    />
                  </div>
                  <div className="answer">
                    <label htmlFor={`${question.id}-c`}>
                      <span></span> {options.c}
                    </label>
                    <input
                      type="radio"
                      name={`${question.id}`}
                      id={`${question.id}-c`}
                      value={options.c}
                      onChange={() => handleAnswerChange(question.id,  'c')}
                    />
                  </div>
                  <div className="answer">
                    <label htmlFor={`${question.id}-d`}>
                      <span></span> {options.d}
                    </label>
                    <input
                      type="radio"
                      name={`${question.id}`}
                      id={`${question.id}-d`}
                      value={options.d}
                      onChange={() => handleAnswerChange(question.id,  'd')}
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1>لا يوجد أسئلة</h1>
        )}
        <div className="btn-send" onClick={handleSend}>إرسال</div>
      </div>
      <Footer />
    </div>
  );
};

export default QuizzesViewQuestions;
