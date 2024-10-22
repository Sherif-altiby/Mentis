import { Link } from "react-router-dom";
import "./CreateTeacher.scss";
import { TeacherProps } from "../../types/index.types";
import { serverUrl } from "../../utils/api";

const CreateTeacherCard = ({
  name,
  id,
  role,
  courses,
  image,
}: TeacherProps) => {
  return (
    <>
      <Link
        to={`/teacher/${name}?query=${role}&id=${id}&subject=${
          courses.length > 0 ? courses[0].title : ""
        }&path=${image}`}
        className={`teacher-card `}
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <div className="content-info">
          <div className="img">
            <img src={`${serverUrl}/${image}`} alt="" />
          </div>
          <h2>{name}</h2>
        </div>
      </Link>
    </>
  );
};

export default CreateTeacherCard;
