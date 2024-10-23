import "../addteacher/AddTeacher.scss";

import { useAppSelector } from "../../../redux/reduxHook";
import { useEffect, useState } from "react";
import { StudentsProps } from "../../../types/index.types";

import img from "../../../assets/phiscs.jpg";
import { blockUser, getAllStudents } from "../../../utils/api";
import Message from "../../message/Message";
import CustomLoading from "../../../pages/loading/CustomLoading";

const Students = () => {
  const [teacherSearch, setTeacherSearch] = useState("");
  const [teacherId, setTeacherId] = useState(0);

  const token = useAppSelector((s) => s.token.token);

  const [selectedStudentName, setSelectedStudentName] = useState("");
  const [selectedStudentPhone, setSelectedStudentPhone] = useState("");
  const [selectedStudentEmail, setSelectedStudentEmail] = useState("");
  const [selectedStudentLeve, setSelectedStudentLeve] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  const [students, setStudents] = useState<StudentsProps[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentsProps[]>([]);

  const getStudents = async () => {
    setFetchLoading(true);
    const res = await getAllStudents(token);
    if (res.length) {
      setStudents(res);
      setFetchLoading(false);
      console.log(res);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  useEffect(() => {
    if (students.length > 0 && teacherSearch.length > 0) {
      console.log(students);
      setFilteredStudents(
        students.filter((student) =>
          student.name.toLowerCase().includes(teacherSearch?.toLowerCase())
        )
      );
    } else {
      setFilteredStudents(students);
    }
  }, [teacherSearch, students]);

  const adminBlockUser = async () => {
    setLoading(true);
    const res = await blockUser(token, teacherId);
    if (res.success) {
      setShowModal(false);
      setShowMsg(true);
      setLoading(false);
    }
  };

  return (
    <div className="admin-add-teacher">
      <div className="card">
        <h1> الطلاب </h1>
        <div className={`card-add `}>
          {fetchLoading && <CustomLoading />}
          <Message
            closeMsg={setShowMsg}
            show={showMsg}
            message="تم حظر الطالب"
          />
          <div className="input">
            <label htmlFor="name"> إسم الطالب </label>
            <input
              type="text"
              id="name"
              value={teacherSearch}
              onChange={(e) => setTeacherSearch(e.target.value)}
            />
          </div>

          <div className="filtered-teacher">
            {filteredStudents?.map((user) => (
              <p
                key={user.user_id}
                onClick={() => {
                  setTeacherSearch(user.name);
                  setTeacherId(user.user_id);
                  setSelectedStudentName(user.name);
                  setSelectedStudentEmail(user.email);
                  setSelectedStudentLeve(user.grade_level);
                  setSelectedStudentPhone(user.phone_number);
                  setShowModal(true);
                }}
              >
                {user.name}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className={`admin-controle-teacher ${showModal ? "show" : ""}`}>
        <div className="controle-card">
          {loading && <CustomLoading />}
          <img src={img} alt="img" />
          <div className="item">
            <div className="info">
              الاسم : <span> {selectedStudentName} </span>
            </div>
            <div className="info">
              رقم التلفون : <span> {selectedStudentPhone} </span>
            </div>
          </div>
          <div className="item">
            <div className="info">
              الصف : <span> {selectedStudentLeve} </span>
            </div>
            <div className="info">
              البريد : <span> {selectedStudentEmail} </span>
            </div>
          </div>
          <div className="btn" onClick={() => adminBlockUser()}>
            حظر
          </div>
          <div
            className="close-modal"
            onClick={() => {
              setShowModal(false);
            }}
          >
            X
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
