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
import { getUserQuizResponce, sendStudentResponses } from '../../utils/api';
import CustomLoading from '../loading/CustomLoading';

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

interface ShuffledQuestion extends QuestionProps {
  shuffledOptions: Array<{ label: string; text: string }>;
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
  const userId = useAppSelector((state) => state.userInfo.userInfo.user_id);

  const [questions, setQuestions] = useState<ShuffledQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<QuestionAnswer[]>([]); 

  const [customLoading, setCustomLoading] = useState(false);

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

      // Shuffle the options when the questions are fetched
      const shuffledQuestions = fetchedQuestions.map((question: QuestionProps) => {
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
      setCustomLoading(true);
      console.log(selectedAnswers);
      await selectedAnswers.map((answer) => {
        sendAnswer(token, answer.id, answer.answer, userId);
      });
      console.log("start");
      const correctAnswers = await getUserQuizResponce(token, userId, quizId);
      console.log('correctAnswers', correctAnswers);
      console.log("end");
      setCustomLoading(false);
    } else {
      console.log("error");
    }
  };

  // Shuffle the options including the correct answer
  const shuffleOptions = (question: QuestionProps) => {
    const optionsArray = [
      { label: 'a', text: JSON.parse(question.options).a },
      { label: 'b', text: JSON.parse(question.options).b },
      { label: 'c', text: JSON.parse(question.options).c },
      { label: 'd', text: question.correct_answer }, 
    ];

    // Fisher-Yates shuffle
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
        {customLoading && <CustomLoading />}

        {loading ? (
          <Loading />
        ) : questions.length > 0 ? (
          questions.map((question) => {
            return (
              <div key={question.id} className="question">
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
