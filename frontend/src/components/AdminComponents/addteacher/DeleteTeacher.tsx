import "./AddTeacher.scss";

import { useAppSelector } from "../../../redux/reduxHook";
import { useEffect, useState } from "react";
import { TeacherProps } from "../../../types/index.types";

const DeleteTeacher = () => {
  const allTeachers = useAppSelector((state) => state.teacher.teachers);

  const [filteredTeachers, setFilteredTeachers] = useState<TeacherProps[]>();
  const [teacherSearch, setTeacherSearch] = useState("");
  const [teacherId, setTeacherId] = useState(0);

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
        <h1> حذف مدرس </h1>

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
                }}
              >
                {teacher.name}
              </p>
            ))}
          </div>

          <div className="btn"> حذف </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTeacher;
