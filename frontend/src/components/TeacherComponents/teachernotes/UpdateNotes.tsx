import Footer from "../../footer/Footer";
import Nav from "../../Navbar/Nav";
import { useSearchParams } from "react-router-dom";
import "./TeacherNotes.scss";
import { useAppSelector, useAppDispatch } from "../../../redux/reduxHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteTeacherNote, getTeacherFiles } from "../../../utils/teacher";
import { useEffect, useState } from "react";
import { addNote, NoteInterface } from "./NoteSlice";
import CustomLoading from "../../../pages/loading/CustomLoading";
import Message from "../../message/Message";

const UpdateNotes = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const level = searchParams.get("level");
  let allNotes = useAppSelector((state) => state.notes.allNotes);
  const token = useAppSelector((state) => state.token.token);
  const [levelNotes, setLevelNotes] = useState<NoteInterface[]>([]);
  const userId = useAppSelector((state) => state.userInfo.userInfo.user_id);
  const [loading, setLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgText, setMsgeText] = useState("");

  const headerText =
    level === "first" ? "الأول" : level === "second" ? "الثاني" : "الثالث";

  useEffect(() => {
    setLevelNotes(allNotes.filter((note) => note.level === level));
  }, []);

  console.log(allNotes)

  const handleDeleteNote = async (id: number) => {
    setLoading(true);
    try {
      await deleteTeacherNote(token, id);
      const resTwo = await getTeacherFiles(token, userId);
      setLevelNotes(resTwo);
      dispatch(addNote(resTwo));
      setMsgeText("تم الحذف بنجاح");
      setShowMsg(true);
    } catch (err) {
      setLoading(false);
      console.log(err);
      setMsgeText(" حاول مرة اخري ");
      setShowMsg(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav showIcon={false} setShowMenu={setShowMsg} />
      <Message show={showMsg} closeMsg={setShowMsg} message={msgText} />
      <div className="update-notes main-container">
        {loading && <CustomLoading />}
        <h1> الصف {headerText} الثانووي </h1>
        <div className="all-notes">
          {levelNotes.length > 0 ? (
            levelNotes.map((note, index) => (
              <div className="note" key={note.file_id}>
                <div className="num"> ({index + 1})</div>
                <div className="title"> {note.title} </div>
                <div className="icons">
                  <div
                    className="icon-container"
                    onClick={() => handleDeleteNote(note.file_id)}
                  >
                    <p> حذف </p>
                    <div className="iconc">
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </div>
                  {/* <div className="icon-container">
                    <p> تعديل </p>
                    <div className="iconc">
                      <FontAwesomeIcon icon={faFilePen} />
                    </div>
                  </div> */}
                </div>
              </div>
            ))
          ) : (
            <h2> لا يوجد مذكرات الان </h2>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdateNotes;
