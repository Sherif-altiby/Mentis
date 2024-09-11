import { useState, useEffect, useRef } from 'react';
import ReactConfetti from 'react-confetti';
import sound from '../../assets/clap.mp3';
import { useSearchParams } from 'react-router-dom';
import { sendStudentResponses, getUserQuizResponce } from '../../utils/api';
import { useAppSelector, useAppDispatch } from '../../redux/reduxHook';
import Nav from '../../components/Navbar/Nav';
import Footer from '../../components/footer/Footer';
import './QuizzesView.scss';
import { setLoading } from '../loading/Loadingslice';
import Loading from '../loading/Loading';
import { getQuizQuestions } from '../../utils/teacher';
import { QuestionAnswer, QuestionPropsInterface, ShuffledQuestion } from '../../types/index.types';



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
  const userId = useAppSelector((state) => state.userInfo.userInfo.user_id);

  const [questions, setQuestions] = useState<ShuffledQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<QuestionAnswer[]>([]); 
  const [errors, setErrors] = useState<number[]>([]);

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

      const shuffledQuestions = fetchedQuestions.map((question: QuestionPropsInterface) => {
        return {
          ...question,
          shuffledOptions: shuffleOptions(question)
        };
      });

      setQuestions(shuffledQuestions);
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

  const sendAnswer = async (token: string | null, QuesId: number, answer: string, stdId: number) => {
    const response = await sendStudentResponses(token, QuesId, answer, stdId);
    console.log(response);
  };

  const handleSend = async () => {
    if (selectedAnswers.length === questions.length) {
      console.log(selectedAnswers);
  
      const newErrors: number[] = [];
      let allAnswersCorrect = true; 
  
      selectedAnswers.forEach((answer) => {
        sendAnswer(token, answer.id, answer.answer, userId);
      });
  
      selectedAnswers.forEach((answer) => {
        const question = questions.find((q) => q.id === answer.id);
        if (question && answer.answer !== question.correct_answer) {
          newErrors.push(answer.id);
          allAnswersCorrect = false; 
        }
      });
  
      setErrors(newErrors); 
  
      if (allAnswersCorrect) {
        setShowFireworks(true);
      }
  
      const correctAnswers = await getUserQuizResponce(token, userId, quizId);
      console.log('correctAnswers', correctAnswers);
    } else {
      console.log("error");
    }
  };
  

  const shuffleOptions = (question: QuestionPropsInterface) => {
    const optionsArray = [
      { label: 'a', text: JSON.parse(question.options).a },
      { label: 'b', text: JSON.parse(question.options).b },
      { label: 'c', text: JSON.parse(question.options).c },
      { label: 'd', text: question.correct_answer }, 
    ];


    for (let i = optionsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsArray[i], optionsArray[j]] = [optionsArray[j], optionsArray[i]];
    }

    return optionsArray;
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
            const isError = errors.includes(question.id); 
            return (
              <div key={question.id} className={`question ${isError ? 'error' : ''}`}>
                <h3>{question.question}</h3>
                <div className="answers">
                  {question.shuffledOptions.map((option) => (
                    <div key={option.label} className="answer">
                      <label htmlFor={`${question.id}-${option.label}`}>
                        <span></span> {option.text}
                      </label>
                      <input
                        type="radio"
                        name={`${question.id}`}
                        id={`${question.id}-${option.label}`}
                        value={option.text}
                        onChange={() => handleAnswerChange(question.id, option.text)}
                      />
                    </div>
                  ))}
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



// 376701@Mentis.com
// Qb5YBWUB
