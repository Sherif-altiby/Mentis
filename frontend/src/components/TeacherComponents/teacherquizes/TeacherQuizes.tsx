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

interface QuizCreatorState {
  questions: Question[];
}

const TeacherQuizes: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

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

  const saveQuiz = () => {
    console.log(questions);
  };

  return (
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
          <button className='add-question-btn' onClick={addQuestion}>Add Question</button>
          {questions.length > 0 && (<button className='btn-send-quize' onClick={saveQuiz}>Save Quiz</button>)}
      </div>
    </div>
  );
};

export default TeacherQuizes;

