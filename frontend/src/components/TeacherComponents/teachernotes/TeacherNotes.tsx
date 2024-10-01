import CountUp from "react-countup";
import { useAppSelector } from "../../../redux/reduxHook";
import { Link } from "react-router-dom";
import "./TeacherNotes.scss";
import { useState } from "react";
import { uploadNote } from "../../../utils/teacher";
import CustomLoading from "../../../pages/loading/CustomLoading";

const TeacherNotes = () => {
  const token = useAppSelector((state) => state.token.token);
  const userId = useAppSelector((state) => state.userInfo.userInfo.user_id);
  const [loading, setLoading] = useState(false);
  const teacher = useAppSelector((state) =>
    state.teacher.teachers.find((item) => item.id === userId)
  );
  const courseId = teacher?.courses[0]?.id;

  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [level, setLevel] = useState("first");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log("No file selected");
      return;
    }
    if (fileName.trim().length === 0) {
      console.log("File name cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const response = await uploadNote(
        token,
        userId,
        courseId,
        fileName,
        "pdf",
        selectedFile,
        "video",
        fileName,
        level
      );
      console.log("File uploaded successfully:", response);
      setLoading(false);
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };

  return (
    <div>
      <h1> المذكرات </h1>
      <div className={`teacher-notes `}>
        <div className="all-teacher-notes">
          <h3> عدد المذكرات التي قمت بإضافتها </h3>
          <p>
            <span> مذكرة </span>
            <span className="counter-up-number">
              <CountUp start={0} end={100} duration={2} />
            </span>
          </p>
        </div>
        <div className="notes-levels">
          <Link to="#">
            <p> أولى ثانوي </p>
            <p>
              <span> مذكرة </span>
              <span className="counter-up-number">
                <CountUp start={0} end={100} duration={2} />
              </span>
            </p>
          </Link>
          <Link to="#">
            <p> ثانية ثانوي </p>
            <p>
              <span> مذكرة </span>
              <span className="counter-up-number">
                <CountUp start={0} end={100} duration={2} />
              </span>
            </p>
          </Link>
          <Link to="#">
            <p> ثالثة ثانوي </p>
            <p>
              <span> مذكرة </span>
              <span className="counter-up-number">
                <CountUp start={0} end={100} duration={2} />
              </span>
            </p>
          </Link>
        </div>
        <div className="add-note">
          {loading && <CustomLoading />}
          <h3> إضافة مذكرة </h3>
          <div className="inputs">
            <div className="input">
              <label htmlFor="name-note"> إسم المذكرة </label>
              <input
                type="text"
                id="name-note"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="file"> اضف ملف </label>
              <input type="file" id="file" onChange={handleFileChange} />
            </div>
          </div>
          <div className="input">
            <label htmlFor="level"> إختر الصف </label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="first">الصف الأول الثانوي</option>
              <option value="second">الصف الثاني الثانوي</option>
              <option value="third">الصف الثالث الثانوي</option>
            </select>
          </div>
          <div className="btn" onClick={handleUpload}>
            حفظ
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherNotes;
