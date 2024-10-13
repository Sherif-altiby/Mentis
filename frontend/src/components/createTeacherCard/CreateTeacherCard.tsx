import { Link } from "react-router-dom";
import "./CreateTeacher.scss";
import phiscs from "../../assets/phiscs.jpg";
import { TeacherProps } from "../../types/index.types";

const CreateTeacherCard = ({ name, id, role, courses }: TeacherProps) => {
  return (
    <>
      <Link
        to={`/teacher/${name}?query=${role}&id=${id}&subject=${
          courses.length > 0 ? courses[0].title : ""
        }`}
        className={`teacher-card `}
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <div className="content-info">
          <div className="img">
            <img src={phiscs} alt="" />
          </div>
          <h2>{name}</h2>
        </div>
      </Link>
    </>
  );
};

export default CreateTeacherCard;
