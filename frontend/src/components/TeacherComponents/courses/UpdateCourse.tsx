import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/reduxHook";
import "./Courses.scss";
import { useSearchParams } from "react-router-dom";
import Nav from "../../Navbar/Nav";
import Footer from "../../footer/Footer";
import {
  deleteTeacherCourse,
  getTeacherAllCourses,
  updateTeacherCourse,
} from "../../../utils/teacher";
import { setLoading } from "../../../pages/loading/Loadingslice";
import Loading from "../../../pages/loading/Loading";
import { courseProps } from "../../../types/index.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CourseTypes } from "./coursesSlice";

const UpdateCourse = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.userInfo.userInfo.user_id);
  const token = useAppSelector((state) => state.token.token);
  const loading = useAppSelector((state) => state.loading.isLoading);
  const firstLevel = useAppSelector(
    (state) => state.coursesLevelsTeacher.firstCourseLevel
  );
  const secondLevel = useAppSelector(
    (state) => state.coursesLevelsTeacher.secondCourseLevel
  );
  const thirdtLevel = useAppSelector(
    (state) => state.coursesLevelsTeacher.thirdCourseLevel
  );

  // const [teacherCourses, setTeacherCourses] = useState<courseProps[]>([]);
  const [searchParams] = useSearchParams();
  const [showCard, setShowCard] = useState(false);
  const [updatedTitle, setUodatedTitle] = useState("");
  const [updatedLevel, setUodatedLevel] = useState("");
  const [updatedFilePath, setUodatedFilePath] = useState("");
  const [lessonId, setLessonId] = useState<string | number>("");
  const [courses, setCourses] = useState<CourseTypes[]>([]);

  const level = searchParams.get("level");
  const headerText =
    level === "first" ? "الأول" : level === "second" ? "الثاني" : "الثالث";

  // const getCourses = async () => {
  //   dispatch(setLoading(true));
  //   try {
  //     const response = await getTeacherAllCourses(userId, token, level);
  //     setTeacherCourses(response.data);
  //   } catch (error) {
  //     dispatch(setLoading(false));
  //   } finally {
  //     dispatch(setLoading(false));
  //   }
  // };

  useEffect(() => {
    if (level === "first") {
      setCourses(firstLevel);
    } else if (level === "second") {
      setCourses(secondLevel);
    } else {
      setCourses(thirdtLevel);
    }
  }, []);

  const deleteCourse = async (id: string | number) => {
    setCourses(courses?.filter((course) => course.id != id));

    await deleteTeacherCourse(token, id);
  };

  const handleShowCard = (
    title: string,
    level: string,
    filePath: string,
    id: string | number
  ) => {
    setShowCard(true);
    setUodatedTitle(title);
    setUodatedLevel(level);
    setUodatedFilePath(filePath);
    setLessonId(id);
  };

  const updateCourse = async () => {
    await updateTeacherCourse(
      token,
      lessonId,
      updatedTitle,
      updatedFilePath,
      updatedLevel
    );
  };

  return (
    <>
      <Nav />
      {loading ? (
        <Loading />
      ) : (
        <div className={`update-course-page `}>
          <h1> الصف {headerText} الثانووي </h1>
          <div className="all-courses-container">
            {courses &&
              courses.map((course: courseProps, index) => (
                <>
                  <div key={course.course_id} className="course-card">
                    <p>
                      <span> ({index + 1}) </span>
                      {course.title}
                    </p>

                    <div className="icons">
                      <div
                        className="icon"
                        onClick={() => deleteCourse(course.id)}
                      >
                        <p> حذف </p>
                        <div className="iconc">
                          <FontAwesomeIcon icon={faTrash} />
                        </div>
                      </div>
                      <div
                        className="icon"
                        onClick={() =>
                          handleShowCard(
                            course.title,
                            course.level,
                            course.file_path,
                            course.id
                          )
                        }
                      >
                        <p> تعديل </p>
                        <div className="iconc">
                          <FontAwesomeIcon icon={faFilePen} />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            {courses.length === 0 && <h3> لا يوجد دروس </h3>}
          </div>
        </div>
      )}
      <Footer />
      <div className={`update-video-card ${showCard && "show"}`}>
        <div className="card">
          <div className="close" onClick={() => setShowCard(false)}>
            X
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="لينك الدرس"
              value={updatedFilePath}
              onChange={(e) => setUodatedFilePath(e.target.value)}
            />
            <input
              type="text"
              placeholder="اسم الدرس"
              value={updatedTitle}
              onChange={(e) => setUodatedTitle(e.target.value)}
            />
          </div>
          <div className="input">
            <label htmlFor="level"> الصف </label>
            <select
              name="level"
              id="level"
              value={updatedLevel}
              onChange={(e) => setUodatedLevel(e.target.value)}
            >
              <option value="first"> الصف الاول الثانوي </option>
              <option value="second"> الصف الثاني الثانوي </option>
              <option value="third"> الصف الثالث الثانوي </option>
            </select>
          </div>
          <div className="btn" onClick={() => updateCourse()}>
            تعديل
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCourse;
