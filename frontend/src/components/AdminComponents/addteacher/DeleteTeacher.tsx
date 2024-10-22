import "./AddTeacher.scss";

import { useAppSelector } from "../../../redux/reduxHook";
import { useEffect, useState } from "react";
import { TeacherProps } from "../../../types/index.types";

import img from "../../../assets/phiscs.jpg";
import { blockUser } from "../../../utils/api";
import Message from "../../message/Message";

const DeleteTeacher = () => {
  const allTeachers = useAppSelector((state) => state.teacher.teachers);
  const token = useAppSelector((state) => state.token.token);
  const [filteredTeachers, setFilteredTeachers] = useState<TeacherProps[]>();
  const [teacherSearch, setTeacherSearch] = useState("");
  const [teacherId, setTeacherId] = useState(0);

  const [selectedTeacherName, setSelectedTeacherName] = useState("");
  const [selectedTeacherPhone, setSelectedTeacherPhone] = useState("");
  const [selectedTeacherEmail, setSelectedTeacherEmail] = useState("");
  const [selectedTeacherCourse, setSelectedTeacherCourse] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    setFilteredTeachers(
      allTeachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(teacherSearch?.toLowerCase())
      )
    );
  }, [teacherSearch]);

  const adminBlockUser = async (id: number) => {
    const res = await blockUser(token, id);
    if (res.success) {
      setShowModal(false);
      setShowMsg(true);
    }
  };

  return (
    <div className="admin-add-teacher">
      <div className="card">
        <h1> حذف مدرس </h1>
        <Message closeMsg={setShowMsg} show={showMsg} message="تم حظر المدرس" />
        <div className={`card-add `}>
          <div className="input">
            <label htmlFor="name"> إسم المدرس </label>
            <input
              type="text"
              id="name"
              value={teacherSearch}
              onChange={(e) => setTeacherSearch(e.target.value)}
            />
          </div>

          <div className="filtered-teacher">
            {filteredTeachers?.map((teacher) => (
              <p
                key={teacher.id}
                onClick={() => {
                  setTeacherSearch(teacher.name);
                  setTeacherId(teacher.id);
                  setSelectedTeacherName(teacher.name);
                  setSelectedTeacherEmail(teacher.email);
                  setSelectedTeacherCourse(teacher.courses[0].title);
                  setSelectedTeacherPhone(teacher.phone_number);
                  setShowModal(true);
                }}
              >
                {teacher.name}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className={`admin-controle-teacher ${showModal ? "show" : ""}`}>
        <div className="controle-card">
          <img src={img} alt="img" />
          <div className="item">
            <div className="info">
              الاسم : <span> {selectedTeacherName} </span>
            </div>
            <div className="info">
              رقم التلفون : <span> {selectedTeacherPhone} </span>
            </div>
          </div>
          <div className="item">
            <div className="info">
              المادة : <span> {selectedTeacherCourse} </span>
            </div>
            <div className="info">
              البريد : <span> {selectedTeacherEmail} </span>
            </div>
          </div>
          <div className="btn" onClick={() => adminBlockUser(teacherId)}>
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

export default DeleteTeacher;
