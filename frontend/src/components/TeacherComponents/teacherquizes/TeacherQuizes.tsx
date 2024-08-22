import CustomLoading from '../../../pages/loading/CustomLoading';
import { setLoading } from '../../../pages/loading/Loadingslice';
import { useAppSelector, useAppDispatch } from '../../../redux/reduxHook';
import { createQuize, createQuizeQuestion } from '../../../utils/teacher';
import './TeacherQuize.scss';
import { useState } from 'react';

interface QuestionComponentProps {
  index: number;
  question: string;
  answers: string[];
  onQuestionChange: (index: number, question: string) => void;
  onAnswerChange: (index: number, answerIndex: number, answer: string) => void;
}

interface Question {
  question: string;
  answers: string[];
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ index, question, answers, onQuestionChange, onAnswerChange }) => {
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQuestionChange(index, e.target.value);
  };

  const handleAnswerChange = (answerIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    onAnswerChange(index, answerIndex, e.target.value);
  };

  return (
    <div className='question-container' >
      <input type="text" placeholder="السؤال" value={question} onChange={handleQuestionChange} />
       <div className="answers">
         {answers.map((answer, i) => (
           <input key={i} type="text" placeholder={`الإجابة ${i === 0 ? 'الأولي' : i === 1 ? 'الثانية' : i ===2 ?'الثالثة' : 'الصحيحة' } `} value={answer} onChange={(e) => handleAnswerChange(i, e)} />
           ))}
       </div>
    </div>
  );
};


const TeacherQuizes: React.FC = () => {

  const dispatch = useAppDispatch()

  const [courseTitle, setCourseTitle] = useState("");
  const [gardeLevel, setGradeLevel] = useState("")

  const [questions, setQuestions] = useState<Question[]>([]);

  const teacherID = useAppSelector((state) => state.userInfo.userInfo.user_id)
  const teacherCourseId = useAppSelector((state) => state.teacher.teachers.find((item) => item.id === teacherID)?.courses[0].id)
  const token = useAppSelector((state) => state.token.token);
  const loading = useAppSelector((state) => state.loading.isLoading);

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answers: ['', '', '', ''] }]);
  };

  const handleQuestionChange = (index: number, question: string) => {
    const newQuestions = [...questions];
    newQuestions[index].question = question;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number, answer: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = answer;
    setQuestions(newQuestions);
  };

  const saveQuiz = async () => {
    dispatch(setLoading(true))
    console.log(questions);
    const mainQuiz = await createQuize(token, teacherCourseId, courseTitle, gardeLevel );
    console.log(mainQuiz);

    if(mainQuiz && questions.length > 0){
      const quizeId = mainQuiz.id;
      
      questions.forEach( async (question) => {
        const sendQuestion = await createQuizeQuestion(token, quizeId, question.question, question.answers[0], question.answers[1], question.answers[2], question.answers[3])
        
        console.log(sendQuestion)
      })
      dispatch(setLoading(false))
    }else{
      dispatch(setLoading(false))
      console.log("error")
    }

  };

  return (
    <div className='teacher-quizzes-container'>
      {loading && (<CustomLoading />) }
        <div className="quize-header">
            <div className="input">
               <input type="text" placeholder='إسم الإختبار' onChange={(e) => setCourseTitle(e.target.value)} />
               <label className='none' htmlFor="select"> df </label>
               <select id="select" onChange={(e) => setGradeLevel(e.target.value)} >
                  <option value="first"> الصف الأول الثانوي </option>
                  <option value="second"> الصف الثاني الثانوي </option>
                  <option value="third"> الصف الثالث الثانوي </option>
               </select>
            </div>
        </div>
        <div>
          {questions.map((question, index) => (
            <QuestionComponent
              key={index}
              index={index}
              question={question.question}
              answers={question.answers}
              onQuestionChange={handleQuestionChange}
              onAnswerChange={handleAnswerChange}
            />
          ))}
          <div className='btn-quize-container' >
              <button className='add-question-btn' onClick={addQuestion}> إضافة سؤال  </button>
              {questions.length > 0 && (<button className='btn-send-quize' onClick={saveQuiz}> حفظ  </button>)}
          </div>
        </div>
    </div>
  );
};

export default TeacherQuizes;

