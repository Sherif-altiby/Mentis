import CustomLoading from "../../../pages/loading/CustomLoading";
import { useAppSelector } from "../../../redux/reduxHook";
import { createQuize, createQuizeQuestion } from "../../../utils/teacher";
import Message from "../../message/Message";
import "./TeacherQuize.scss";
import { useState } from "react";

interface QuestionComponentProps {
  index: number;
  question: string;
  answers: string[];
  onQuestionChange: (index: number, question: string) => void;
  onAnswerChange: (index: number, answerIndex: number, answer: string) => void;
  hasError: boolean;
}

interface Question {
  question: string;
  answers: string[];
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  index,
  question,
  answers,
  onQuestionChange,
  onAnswerChange,
  hasError,
}) => {
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQuestionChange(index, e.target.value);
  };

  const handleAnswerChange = (
    answerIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onAnswerChange(index, answerIndex, e.target.value);
  };

  return (
    <div className={`question-container`}>
      <input
        type="text"
        placeholder="السؤال"
        value={question}
        onChange={handleQuestionChange}
        className={hasError && !question ? "error" : ""}
      />
      <div className="answers">
        {answers.map((answer, i) => (
          <input
            key={i}
            type="text"
            placeholder={`الإجابة ${
              i === 0
                ? "الأولي"
                : i === 1
                ? "الثانية"
                : i === 2
                ? "الثالثة"
                : "الصحيحة"
            }`}
            value={answer}
            onChange={(e) => handleAnswerChange(i, e)}
            className={hasError && !answer ? "error" : ""}
          />
        ))}
      </div>
    </div>
  );
};

const TeacherQuizes: React.FC = () => {

  const [courseTitle, setCourseTitle] = useState("");
  const [gardeLevel, setGradeLevel] = useState("first");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [hasError, setHasError] = useState(false);

  const teacherID = useAppSelector((s) => s.userInfo.userInfo.user_id);
  const teacherCourseId = useAppSelector((s) => s.teacher.teachers.find((item) => item.id === teacherID)?.courses[0].id);
  const token = useAppSelector((s) => s.token.token);
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false)

  const addQuestion = () => { setQuestions([...questions, { question: "", answers: ["", "", "", ""] }]);};

  const handleQuestionChange = (index: number, question: string) => {
    const newQuestions = [...questions];
    newQuestions[index].question = question;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = ( questionIndex: number, answerIndex: number, answer: string ) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = answer;
    setQuestions(newQuestions);
  };

  const saveQuiz = async () => {
    const hasEmptyFields = questions.some(
      (question) => !question.question || question.answers.some((answer) => !answer) );

    if (hasEmptyFields) { setHasError(true);  return; }

    setLoading(true)
    const mainQuiz = await createQuize( token, teacherCourseId, courseTitle, gardeLevel );

    if (mainQuiz && questions.length > 0) {
      const quizeId = mainQuiz.id;

      questions.forEach(async (question) => {
        const result = await createQuizeQuestion( token, quizeId, question.question, question.answers[0], question.answers[1], question.answers[2], question.answers[3]);
        console.log(result);
        setShow(true)
        setQuestions([]);
        setLoading(false)
      });

    } else {
      setLoading(false)
    }
  };

  return (
    <div className={`teacher-quizzes-container `}>
      {loading && <CustomLoading />}
      <div className="quize-header">
        <Message message="تم اضافة الاختبار بنجاح" closeMsg={setShow} show={show} />
        <div className="input">
          <input
            type="text"
            placeholder="إسم الإختبار"
            onChange={(e) => setCourseTitle(e.target.value)}
          />
          <label className="none" htmlFor="select">
            choice label
          </label>
          <select id="select" onChange={(e) => setGradeLevel(e.target.value)}>
            <option value="first">الصف الأول الثانوي</option>
            <option value="second">الصف الثاني الثانوي</option>
            <option value="third">الصف الثالث الثانوي</option>
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
            hasError={hasError}
          />
        ))}
        <div className="btn-quize-container">
          <button className="add-question-btn" onClick={addQuestion}>
            إضافة سؤال
          </button>
          {questions.length > 0 && (
            <button className="btn-send-quize" onClick={saveQuiz}>
              حفظ
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherQuizes;
