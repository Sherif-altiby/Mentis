import "../addteacher/AddTeacher.scss";

import { useAppSelector } from "../../../redux/reduxHook";
import { useEffect, useState } from "react";
import { TeacherProps } from "../../../types/index.types";

import img from "../../../assets/phiscs.jpg";

const Students = () => {
  const allTeachers = useAppSelector((state) => state.teacher.teachers);

  const [filteredTeachers, setFilteredTeachers] = useState<TeacherProps[]>();
  const [teacherSearch, setTeacherSearch] = useState("");
  const [teacherId, setTeacherId] = useState(0);

  const [selectedStudentName, setSelectedStudentName] = useState("");
  const [selectedStudentPhone, setSelectedStudentPhone] = useState("");
  const [selectedStudentEmail, setSelectedStudentEmail] = useState("");
  const [selectedStudentCourse, setSelectedStudentCourse] = useState("");

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setFilteredTeachers(
      allTeachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(teacherSearch?.toLowerCase())
      )
    );
    console.log("first");
  }, [teacherSearch]);

  return (
    <div className="admin-add-teacher">
      <div className="card">
        <h1> الطلاب </h1>

        <div className={`card-add `}>
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
            {filteredTeachers?.map((teacher) => (
              <p
                key={teacher.id}
                onClick={() => {
                  setTeacherSearch(teacher.name);
                  setTeacherId(teacher.id);
                  setSelectedStudentName(teacher.name);
                  setSelectedStudentEmail(teacher.email);
                  setSelectedStudentCourse(teacher.courses[0].title);
                  setSelectedStudentPhone(teacher.phone_number);
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
              الاسم : <span> {selectedStudentName} </span>
            </div>
            <div className="info">
              رقم التلفون : <span> {selectedStudentPhone} </span>
            </div>
          </div>
          <div className="item">
            <div className="info">
              المادة : <span> {selectedStudentCourse} </span>
            </div>
            <div className="info">
              البريد : <span> {selectedStudentEmail} </span>
            </div>
          </div>
          <div className="btn"> حظر </div>
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
