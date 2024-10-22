import axios from "axios";
import "./AddTeacher.scss";
import { ChangeEvent, useState } from "react";
import { api, getUserInfo } from "../../../utils/api";

import { useAppSelector } from "../../../redux/reduxHook";
import CustomLoading from "../../../pages/loading/CustomLoading";
import Message from "../../message/Message";

const AddTeacher = () => {
  const [teacherName, setTeacherName] = useState("");
  const [teacherPhone, setTeacherPhone] = useState("");
  const [teacherImg, setTeacherImg] = useState<File | null>(null);
  const [teacherpassword, setTeacherPassword] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");

  const [showCard, setShowCard] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const errMsg = "حدث خطا! حاول مرة اخري";
  const token = useAppSelector((state) => state.token.token);
  const [loading, setLoading] = useState(false);

  const createTeacherAcount = async ({
    teacherName,
    teacherPhone,
  }: {
    teacherName: string;
    teacherPhone: string;
    image: File | null;
  }) => {
    const formData = new FormData();
    formData.append("role", "teacher");
    formData.append("name", teacherName);
    formData.append("phone", teacherPhone);
    if (teacherImg) {
      formData.append("image", teacherImg);
    }
    try {
      setLoading(true);
      const respone = await axios.post(`${api}/register`, formData, {
        headers: {
          Authorization: `Bearer  ${token}`,
        },
      });

      setTeacherPassword(respone.data.user_password);

      console.log(respone.data);

      const teacherData = await getUserInfo(respone.data.token);

      setTeacherEmail(teacherData.email);

      setLoading(false);
      setShowCard(true);
    } catch (error) {
      setShowErr(true);
      console.log(error);
    } finally {
      setLoading(false);
      setTeacherName("");
      setTeacherPhone("");
    }
  };

  const handleClick = async () => {
    if (teacherName.length > 0 && teacherPhone.length > 0) {
      console.log("first");
      await createTeacherAcount({
        teacherName,
        teacherPhone,
        image: teacherImg,
      });
    }
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setTeacherImg(file);
    }
  };

  return (
    <div className="admin-add-teacher">
      <div className="card">
        <h1> إضافة مدرس </h1>
        <Message show={showErr} message={errMsg} closeMsg={setShowErr} />
        <div className={`card-add`}>
          <div className="input-container">
            {loading ? <CustomLoading /> : null}
            <div className="input">
              <label htmlFor="name"> إسم المدرس </label>
              <input
                type="text"
                id="name"
                onChange={(e) => setTeacherName(e.target.value)}
                value={teacherName}
              />
            </div>
            <div className="input">
              <label htmlFor="phone"> رقم التلفون </label>
              <input
                type="number"
                id="phone"
                onChange={(e) => setTeacherPhone(e.target.value)}
                value={teacherPhone}
              />
            </div>
            <div className="input">
              <label htmlFor="img"> صورة المدرس </label>
              <input type="file" id="img" onChange={handleImageUpload} />
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
          X
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

// 247870@Mentis.com

// zMfHsdUT
