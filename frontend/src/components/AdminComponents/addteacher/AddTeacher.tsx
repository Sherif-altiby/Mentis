import axios from "axios";
import "./AddTeacher.scss";
import { useState } from "react";
import { getUserInfo } from "../../../utils/api";

import { useAppSelector, useAppDispatch } from "../../../redux/reduxHook";
import CustomLoading from "../../../pages/loading/CustomLoading";

import { setLoading } from "../../../pages/loading/Loadingslice";

const AddTeacher = () => {
  const [teacherName, setTeacherName] = useState("");
  const [teacherPhone, setTeacherPhone] = useState("");

  const [teacherpassword, setTeacherPassword] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");

  const dispatch = useAppDispatch();

  const [showCard, setShowCard] = useState(false);

  const token = useAppSelector((state) => state.token.token);
  const loading = useAppSelector((state) => state.loading.isLoading);

  const createTeacherAcount = async ({
    teacherName,
    teacherPhone,
  }: {
    teacherName: string;
    teacherPhone: string;
  }) => {
    try {
      dispatch(setLoading(true));
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

      setTeacherPassword(respone.data.user_password);

      console.log(respone.data);

      const teacherData = await getUserInfo(respone.data.token);

      setTeacherEmail(teacherData.email);

      dispatch(setLoading(false));
      setShowCard(true);
    } catch (error) {
      console.log(error);
    }
  };

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

        <div className={`card-add`}>
          {loading ? <CustomLoading /> : null}

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
          <div className="btn" onClick={handleClick}>
            إضافة
          </div>
        </div>
      </div>

      <div
        className={
          showCard ? "teacher-card-created show" : "teacher-card-created"
        }
      >
        <div className="close" onClick={() => setShowCard(false)}>
          {" "}
          X{" "}
        </div>

        <div className="teacher-info">
          <p> بريد المدرس </p>
          <p className="error"> {teacherEmail} </p>
        </div>
        <div className="teacher-info">
          <p> كلمة المرور</p>
          <p className="error"> {teacherpassword}</p>
        </div>
      </div>
    </div>
  );
};

export default AddTeacher;
