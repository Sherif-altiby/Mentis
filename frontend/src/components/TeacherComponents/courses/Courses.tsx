import { Link } from "react-router-dom";
import "./Courses.scss";
import { GiCloudUpload } from "react-icons/gi";
import CountUp from "react-countup";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHook";
import { useEffect, useState } from "react";
import CustomLoading from "../../../pages/loading/CustomLoading";
import Message from "../../message/Message";
import { createTeacherCourse, getCourseId, getTeacherAllCourses, } from "../../../utils/teacher";
import { setFirstLevelCourses, setSecondLevelCourses, setThirdLevelCourses, } from "./coursesSlice";

const Courses = () => {
  const [courseName, setCourseName] = useState("");
  const [courseLevel, setCourseLevel] = useState("");
  const [courseLink, setCourseLink] = useState("");
  const [courseId, setCourseId] = useState("0");
  const [loading, setLoading] = useState(false);

  const [msg, setMsg] = useState(false);
  const token = useAppSelector((state) => state.token.token);
  const teacherId = useAppSelector((state) => state.userInfo.userInfo.user_id);

  const [fetchLoading, setFetchLoading] = useState(false);

  let firstLeveCourses = useAppSelector(
    (state) => state.coursesLevelsTeacher.firstCourseLevel
  );
  let secondLeveCourses = useAppSelector(
    (state) => state.coursesLevelsTeacher.secondCourseLevel
  );
  let thirdLeveCourses = useAppSelector(
    (state) => state.coursesLevelsTeacher.thirdCourseLevel
  );

  const distpatch = useAppDispatch();

  useEffect(() => {
    const courseId = async () => {
      const response = await getCourseId(token, teacherId);
      setCourseId(response.courses[0].id);
    };

    courseId();
  }, []);

  const createCourse = async () => {
    setLoading(true);

    const course = await createTeacherCourse( token, courseName, courseLevel, courseId, courseLink );

    console.log(course);

    if (course) {
      await getTeacherCourses();
      setLoading(false);
      setMsg(true);
      setCourseName("");
      setCourseLevel("");
      setCourseLink("");
    }
  };

  const handleClick = () => {
    if (
      courseName.length > 0 &&
      courseLink.length > 0 &&
      courseLevel.length > 0
    ) {
      createCourse();
    }
  };

  const getTeacherCourses = async () => {
    if (
      firstLeveCourses.length === 0 &&
      secondLeveCourses.length === 0 &&
      thirdLeveCourses.length === 0
    ) {
      setFetchLoading(true);
    }

    // first level courses
    const firstResponse = await getTeacherAllCourses(teacherId, token, "first");

    if (firstResponse.data) {
      distpatch(setFirstLevelCourses(firstResponse.data));
    } else {
      distpatch(setFirstLevelCourses([]));
    }

    // second level courses
    const secondRespons = await getTeacherAllCourses(
      teacherId,
      token,
      "second"
    );

    if (secondRespons.data) {
      distpatch(setSecondLevelCourses(secondRespons.data));
      console.log("true");
    } else {
      distpatch(setSecondLevelCourses([]));
    }

    // second level courses
    const thirsdRequest = await getTeacherAllCourses(teacherId, token, "third");

    if (thirsdRequest.data) {
      distpatch(setThirdLevelCourses(thirsdRequest.data));
    } else {
      distpatch(setThirdLevelCourses([]));
    }

    setFetchLoading(false);
  };

  useEffect(() => {
    getTeacherCourses();
  }, []);

  return (
    <div>
       
          <Message show={msg} message="تم إضافة الدرس بنجاح" closeMsg={setMsg} />
          <div className={`teacher-dashboard-courses`}>
            {fetchLoading && <CustomLoading />}
            <h1> الدروس </h1>
            <div className="courses-amount">
              <h3> عدد الدروس التي قمت بإضافتها </h3>
              <p>
                <span> درس </span>
                <span className="counter-up-number">
                  <CountUp
                    start={0}
                    end={
                      firstLeveCourses.length +
                      secondLeveCourses.length +
                      thirdLeveCourses.length
                    }
                    duration={2}
                  />
                </span>
              </p>
            </div>
            <div className="courses-levels">
              <Link
                to={`/teacher/courses/teacher-courses?query=course&level=first`}
              >
                <p> أولى ثانوي </p>
                <p>
                  <span> درس </span>
                  <span className="counter-up-number">
                    <CountUp
                      start={0}
                      end={firstLeveCourses.length}
                      duration={2}
                    />
                  </span>
                </p>
              </Link>
              <Link
                to={`/teacher/courses/teacher-courses?query=course&level=second`}
              >
                <p> ثانية ثانوي </p>
                <p>
                  <span> درس </span>
                  <span className="counter-up-number">
                    <CountUp
                      start={0}
                      end={secondLeveCourses.length}
                      duration={2}
                    />
                  </span>
                </p>
              </Link>
              <Link
                to={`/teacher/courses/teacher-courses?query=course&level=third`}
              >
                <p> ثالثة ثانوي </p>
                <p>
                  <span> درس </span>
                  <span className="counter-up-number">
                    <CountUp
                      start={0}
                      end={thirdLeveCourses.length}
                      duration={2}
                    />
                  </span>
                </p>
              </Link>
            </div>
            <div className="add-course-card">
              {loading && <CustomLoading />}
              <h3> إضافة درس </h3>

              <div className="input-container">
                <div className="input">
                  <label htmlFor="course-name"> عنوان الدرس </label>
                  <input
                    type="text"
                    id="course-name"
                    onChange={(e) => setCourseName(e.target.value)}
                    value={courseName}
                  />
                </div>
                <div className="input">
                  <label htmlFor="course-link"> رابط الدرس </label>
                  <input
                    type="text"
                    id="course-link"
                    onChange={(e) => setCourseLink(e.target.value)}
                    value={courseLink}
                  />
                </div>
              </div>
              <div className="input">
                <label htmlFor="course-level"> إختر الصف </label>
                <select
                  name="course-level"
                  id="course-level"
                  onChange={(e) => setCourseLevel(e.target.value)}
                  value={courseLevel}
                >
                  <option value=""> </option>
                  <option value="first"> الصف الاول الثانوي </option>
                  <option value="second"> الصف الثاني الثانوي </option>
                  <option value="third"> الصف الثالث الثانوي </option>
                </select>
              </div>
              <div className="btns">
                <div className="btn" onClick={handleClick}>
                  <p> إضافة الدرس </p>
                  <div className="icon">
                    <GiCloudUpload />
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
};

export default Courses;
