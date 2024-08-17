
const QuestionComponent = () => {
  return (
    <div className="question-container">
      <input type="text" placeholder="عنوان السؤال" />
      <div className="answers">
        <input type="text" placeholder="الجواب الأول" name="false" />
        <input type="text" placeholder="الجواب الثاني" name="false" />
        <input type="text" placeholder="الجواب الثالث" name="false" />
        <input type="text" placeholder="الجواب الصحيح" name="true" />
      </div>
    </div>
  );
};

export default QuestionComponent;
