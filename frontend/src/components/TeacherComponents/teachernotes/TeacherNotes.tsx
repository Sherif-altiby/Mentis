import CountUp from "react-countup";
import { useAppSelector, useAppDispatch } from "../../../redux/reduxHook";
import { Link } from "react-router-dom";
import "./TeacherNotes.scss";
import { useEffect, useState } from "react";
import { getTeacherFiles, uploadNote } from "../../../utils/teacher";
import CustomLoading from "../../../pages/loading/CustomLoading";
import Message from "../../message/Message";
import { addNote, NoteInterface } from "./NoteSlice";
import Loading from "../../../pages/loading/Loading";

interface Note {
  course_id: number;
  file_id: number;
  file_path: string;
  level: string;
  title: string;
}

const TeacherNotes = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token.token);
  let allTeacherNotes = useAppSelector((state) => state.notes.allNotes);
  const userId = useAppSelector((state) => state.userInfo.userInfo.user_id);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const teacher = useAppSelector((state) => state.teacher.teachers.find((item) => item.id === userId));
  const courseId = teacher?.courses[0]?.id;

  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [level, setLevel] = useState("first");

  const [showMsg, SetShowMsg] = useState(false);
  const [msgText, setMsgText] = useState("");

  const [firstLeveNote, setFirstLeveNote] = useState<NoteInterface[]>([]);
  const [secondLeveNote, setSecondLeveNote] = useState<NoteInterface[]>([]);
  const [thirdLeveNote, setThirdLeveNote] = useState<NoteInterface[]>([]);

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

    console.log(selectedFile)
    console.log(fileName)

    try {
      setLoading(true);
      const res  =  await uploadNote( token, userId, courseId, fileName, "document", selectedFile, "document", fileName, level);
      console.log(res)
      setSelectedFile(null);
      setFileName("");
      setLevel("first");
      getFiles();
      setLoading(false);
      SetShowMsg(true);
      setMsgText("تم إضافة المذكرو بنجاح");
    } catch (error) {
      setLoading(false);
      SetShowMsg(true);
      setSelectedFile(null);
      setFileName("");
      setLevel("first");
      setMsgText("  حدث خطا اثناء التحميل");
    }
  };

  const getFiles = async () => {
    if (allTeacherNotes.length === 0) {
      setFetchLoading(true);
    }
    try {
      const res = await getTeacherFiles(token, userId);
      allTeacherNotes = res;
      dispatch(addNote(res));
      setFirstLeveNote(
        allTeacherNotes.filter((item: Note) => item.level === "first")
      );
      setSecondLeveNote(
        allTeacherNotes.filter((item: Note) => item.level === "second")
      );
      setThirdLeveNote(
        allTeacherNotes.filter((item: Note) => item.level === "third")
      );
      setFetchLoading(false);
    } catch (e) {
      setFetchLoading(false);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <div>
      <Message show={showMsg} message={msgText} closeMsg={SetShowMsg} />
      {fetchLoading && <Loading />}
      <h1> المذكرات </h1>
      <div className={`teacher-notes `}>
        <div className="all-teacher-notes">
          <h3> عدد المذكرات التي قمت بإضافتها </h3>
          <p>
            <span> مذكرة </span>
            <span className="counter-up-number">
              <CountUp start={0} end={allTeacherNotes.length} duration={2} />
            </span>
          </p>
        </div>
        <div className="notes-levels">
          <Link to="/teacher/dashboard/controle/notes/update-notes?level=first">
            <p> أولى ثانوي </p>
            <p>
              <span> مذكرة </span>
              <span className="counter-up-number">
                <CountUp start={0} end={firstLeveNote.length} duration={2} />
              </span>
            </p>
          </Link>
          <Link to="/teacher/dashboard/controle/notes/update-notes?level=second">
            <p> ثانية ثانوي </p>
            <p>
              <span> مذكرة </span>
              <span className="counter-up-number">
                <CountUp start={0} end={secondLeveNote.length} duration={2} />
              </span>
            </p>
          </Link>
          <Link to="/teacher/dashboard/controle/notes/update-notes?level=third">
            <p> ثالثة ثانوي </p>
            <p>
              <span> مذكرة </span>
              <span className="counter-up-number">
                <CountUp start={0} end={thirdLeveNote.length} duration={2} />
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
