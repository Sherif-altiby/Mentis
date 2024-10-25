import { Outlet, useLocation, useParams } from "react-router-dom";
import "./Teacher.scss";
import { useAppSelector } from "../../redux/reduxHook";
import Loading from "../loading/Loading";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCircleQuestion,
  faNotesMedical,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import { serverUrl } from "../../utils/api";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Teacher = () => {
  const loading = useAppSelector((state) => state.loading.isLoading);
  const query = useQuery();
  const id = query.get("id");
  const img = query.get("path");
  const imgPath = `${serverUrl}/${img}`;
  const allTeachers = useAppSelector((state) => state.teacher.teachers);
  const teacher = allTeachers.filter((teacher) => teacher.id === Number(id));

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="teacher-page">
          <div className="teaher__aboout">
            <div className="teacher__info">
              <div className="img">
                <img src={imgPath} alt="teacher image" />
              </div>
              <h3> {teacher[0].name} </h3>
              <p> {teacher[0].courses[0].title} </p>
            </div>
            <div className="teacher__desc">
              {teacher[0].courses[0].description}
            </div>
          </div>

          <div className="teacher-links">
            <Link
              className="link"
              to={`/user/user-subjects/videos?query=videos&id=${id}`}
            >
              <div className="icon">
                <FontAwesomeIcon icon={faVideoSlash} />
              </div>
              <p> الفديوهات </p>
            </Link>
            <Link
              className="link"
              to={`/user/user-subjects/notes?query=videos&id=${id}`}
            >
              <div className="icon">
                <FontAwesomeIcon icon={faNotesMedical} />
              </div>
              <p> المذكرات </p>
            </Link>
            <Link
              className="link"
              to={`/user/user-subjects/quizzes?query=videos&id=${id}`}
            >
              <div className="icon">
                <FontAwesomeIcon icon={faFileCircleQuestion} />
              </div>
              <p> الإختبارات </p>
            </Link>
          </div>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default Teacher;
