import "./AddCourse.scss";

import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHook";
import { TeacherProps } from "../../../types/index.types";
import { setLoading } from "../../../pages/loading/Loadingslice";
import CustomLoading from "../../../pages/loading/CustomLoading";
import Message from "../../message/Message";

const AddCourse = () => {
  const token = useAppSelector((state) => state.token.token);
  const loading = useAppSelector((state) => state.loading.isLoading);

  const dispatch = useAppDispatch();

  const [teachers, setTeachers] = useState<TeacherProps[]>();

  const [courseName, setCourseName] = useState("");
  const [courseDesc, setCourseDeesc] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [teacherId, setTeacherId] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [showMsg, setShow] = useState(false);

  useEffect(() => {
    const getAllTeachers = async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/teachers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTeachers(response.data);
    };

    getAllTeachers();
  }, []);

  const handelAddCours = async () => {
    if (
      courseName.length > 0 &&
      courseDesc.length > 0 &&
      coursePrice.length > 0 &&
      teacherId > 0 &&
      selectedImage
    ) {
      dispatch(setLoading(true));

      const formData = new FormData();
      formData.append("title", courseName);
      formData.append("description", courseDesc);
      formData.append("price", coursePrice);
      formData.append("teacher_id", teacherId.toString());
      formData.append("image", selectedImage);

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/courses",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response.data);

        if (response.data.status === "success") {
          dispatch(setLoading(false));
          setCourseName("");
          setCourseDeesc("");
          setCoursePrice("");
          setTeacherId(0);
          setSelectedImage(null);
          setShow(true);
        } else {
          dispatch(setLoading(false));
          console.log(response.data.response);
        }
      } catch (error) {
        dispatch(setLoading(false));
        console.error("Error uploading the course:", error);
      }
    } else {
      console.log("Please fill in all fields and select an image.");
    }
  };

  return (
    <div className="add-course-admin">
      <Message
        show={showMsg}
        message="تم إضافة المادة بنجاح"
        closeMsg={setShow}
      />

      <h1> إضافة كورس </h1>

      <div className={`add-course-section `}>
        {loading ? <CustomLoading /> : null}
        <div className="input-container">
          <div className="input">
            <label htmlFor="course-name"> إسم المادة </label>
            <input
              type="text"
              id="course-name"
              onChange={(e) => setCourseName(e.target.value)}
              value={courseName}
            />
          </div>
          <div className="input">
            <label htmlFor="course-desc"> الشرح </label>
            <input
              type="text"
              id="course-desc"
              onChange={(e) => setCourseDeesc(e.target.value)}
              value={courseDesc}
            />
          </div>
        </div>
        <div className="input-container">
          <div className="input">
            <label htmlFor="course-price"> سعر المادة </label>
            <input
              type="number"
              id="course-price"
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
            />
          </div>
          <div className="input">
            <label htmlFor="course-teacher-name"> اختر المدرس </label>
            <select
              id="course-teacher-name"
              onChange={(e) => setTeacherId(Number(e.target.value))}
              value={teacherId}
            >
              <option value="0"></option>
              {teachers?.map((teacher) => (
                <option value={teacher.id} key={teacher.id}>
                  {" "}
                  {teacher.name}{" "}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="input">
          <label htmlFor="img"> صورة المادة </label>
          <input
            type="file"
            id="img"
            onChange={(e) =>
              setSelectedImage(e.target.files ? e.target.files[0] : null)
            }
          />
        </div>

        <div className="add-btn" onClick={handelAddCours}>
          {" "}
          إضافة{" "}
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
