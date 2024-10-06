import { useEffect, useState } from "react";
import { setAllVideos, setVideoId } from "../videoplayer/videoSlice";
import { getTeacherAllCourses } from "../../utils/teacher";
import { setLoading } from "../loading/Loadingslice";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHook";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Nav from "../../components/Navbar/Nav";
import Footer from "../../components/footer/Footer";
import "./VideoPlayer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const AllVideos = () => {
  const query = useQuery();
  const [courses, setCourses] = useState<any[]>([]);
  const token = useAppSelector((state) => state.token.token);
  const gradeLeve = useAppSelector(
    (state) => state.userInfo.userInfo.grade_level
  );
  const dispatch = useAppDispatch();
  const [noCourses, setNoCourses] = useState(false);

  const id = query.get("id");

  let grade_level = "first";

  useEffect(() => {
    const fetchCourses = async () => {
      if (gradeLeve === 1) {
        grade_level = "first";
      }

      if (gradeLeve === 2) {
        grade_level = "second";
      }

      if (gradeLeve === 3) {
        grade_level = "third";
      }

      dispatch(setLoading(true));
      if (id && token) {
        try {
          const courses = await getTeacherAllCourses(id, token, grade_level);
          setCourses(courses.data);
          dispatch(setLoading(false));
          dispatch(setAllVideos(courses.data));
        } catch (error) {
          console.error("Error fetching courses:", error);
          setNoCourses(true);
          dispatch(setLoading(false));
        }
      }
    };

    console.log(courses);

    fetchCourses();
  }, [token]);

  return (
    <div>
      <Nav />
      <div className={`all-courses `}>
        <h2 className="title"> الدروس </h2>
        {courses &&
          courses.map((course, index) => (
            <Link
              to="/user/user-subjects/video-play"
              key={course.id}
              className="course"
              onClick={() => dispatch(setVideoId(course.file_path))}
            >
              <div className="num"> ({index + 1}) </div>
              <h3>{course.title}</h3>
              <div className="icon">
                <FontAwesomeIcon icon={faVideo} />{" "}
              </div>
            </Link>
          ))}
        {noCourses && <h3> لا يوجد دروس الان </h3>}
      </div>
      <Footer />
    </div>
  );
};

export default AllVideos;
