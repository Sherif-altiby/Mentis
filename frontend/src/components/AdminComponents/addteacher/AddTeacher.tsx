import axios from "axios";
import "./AddTeacher.scss";
import { useState } from "react";
import { getUserInfo } from "../../../utils/api";

import { useAppSelector } from "../../../redux/reduxHook";

const AddTeacher = () => {
  const [teacherName, setTeacherName] = useState("");
  const [teacherPhone, setTeacherPhone] = useState("");

  const [teacherpassword, setTeacherPassword] = useState("")
  const [teacherEmail, setTeacherEmail] = useState("")

  const [showCard, setShowCard] = useState(false)

  const token = useAppSelector((state) => state.token.token);

  const createTeacherAcount = async ({
    teacherName,
    teacherPhone,
  }: {
    teacherName: string;
    teacherPhone: string;
  }) => {
    try {
      const respone = await axios.post(
        "http://127.0.0.1:8000/api/register",
        {
          role: "teacher",
          name: teacherName,
          phone: teacherPhone,
        },
        {
          headers: {
            Authorization: `Bearer  ${token}`,
          },
        }
      );

      setTeacherPassword(respone.data.user_password      )

      console.log(respone.data);

      const teacherData = await getUserInfo(respone.data.token);

      setTeacherEmail(teacherData.email)

      setShowCard(true)

      console.log(teacherData);
    } catch (error) {
      console.log(error);
    }
  };

  // 523447@Mentis.com
  // n3lqieFg

  const handleClick = async () => {
    if (teacherName.length > 0 && teacherPhone.length > 0) {
      console.log("first");
      await createTeacherAcount({ teacherName, teacherPhone });
    }
  };

  return (
    <div className="admin-add-teacher">
      <div className="card">
        <h1> إضافة مدرس </h1>

        <div className="card-add">
          <div className="input-container">
            <div className="input">
              <label htmlFor="name"> إسم المدرس </label>
              <input
                type="text"
                id="name"
                onChange={(e) => setTeacherName(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="phone"> رقم التلفون </label>
              <input
                type="number"
                id="phone"
                onChange={(e) => setTeacherPhone(e.target.value)}
              />
            </div>
          </div>
          {/* <div className="input">
            <label htmlFor="subject"> إسم المادة </label>
            <select name="subject" id="subject">
              <option value="0"></option>
              <option value="رياضيات">رياضيات</option>
              <option value="لغة عربية">لغة عربية</option>
              <option value="لغة انجليزية">لغة انجليزية</option>
              <option value="كمياء">كمياء</option>
            </select>
          </div> */}
          <div className="btn" onClick={handleClick}>
            إضافة
          </div>
        </div>
      </div>

      <div className={showCard ? "teacher-card-created show" : "teacher-card-created"}>
        <div className="close" onClick={() => setShowCard(false)} > X </div>

        <div className="teacher-info">
          <p> بريد المدرس </p>
          <p className="error" > {teacherEmail} </p>
        </div>
        <div className="teacher-info">
          <p> كلمة المرور</p>
          <p className="error" > {teacherpassword}</p>
        </div>
      </div>
    </div>
  );
};

export default AddTeacher;
