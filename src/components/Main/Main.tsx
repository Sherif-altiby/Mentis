import { Link } from "react-router-dom";
import MainHeader from "../mainheader/MainHeader";
import math from "../../assets/math.png";
import phiscs from "../../assets/phiscs.jpg";
import chemistry from "../../assets/chemistry.jpg";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Circles from "../animation/Circles";

type card = { id: number; title: string; img: string; link: string };
type dataType = card[];

const data: dataType = [
  {
    id: 1,
    title: "الكمياء",
    img: chemistry,
    link: "/material/chmistry",
  },
  {
    id: 2,
    title: "الفزياء",
    img: phiscs,
    link: "/material/phiscs",
  },
  {
    id: 5,
    title: "الرياضايت",
    img: math,
    link: "/material/math",
  },
  {
    id: 5,
    title: "الاحصاء",
    img: math,
    link: "/material/propability",
  },
  {
    id: 5,
    title: "العلوم",
    img: math,
    link: "/material/science",
  },
  {
    id: 5,
    title: "الانجليزي",
    img: math,
    link: "/material/english",
  },
  {
    id: 5,
    title: "عربي",
    img: math,
    link: "/material/arabic",
  },
  {
    id: 6,
    title: "فرنساوي",
    img: math,
    link: "/material/french",
  },
  {
    id: 3,
    title: "الالماني",
    img: math,
    link: "/material/germany",
  },
];

const CreateMaterial = ({ data }: { data: card }) => {
  return (
    <>
      <Link to={data.link}>
        <div className="material">
          <div className="img">
            {" "}
            <img src={data.img} alt="" />{" "}
          </div>
          <h3> {data.title} </h3>
        </div>
      </Link>
    </>
  );
};

const CreateTeacher = () => {
  return (
    <>
      <Link to="/">
        <div className="teacher-card">
          <div className="img">
            {" "}
            <img src={phiscs} alt="" />{" "}
          </div>
          <h2> أ/ محمد عبد النور </h2>
          <p> كمياء </p>
        </div>
      </Link>
    </>
  );
};
const Main = () => {
  return (
    <div>
      <div className="main-section">
      <Circles />
      
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
        <div className="wave wave-4"></div>
      </div>

      <div className="all-materials">
        <MainHeader title="المواد الدراسية" />

        <div className="main-swiper-slider">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            navigation
            autoplay={true}
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
          >
            {data.map((item) => (
              <SwiperSlide>
                <CreateMaterial data={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="all-teachers">
        <MainHeader title="المدرسين" />
        <div className="teachers">
          <CreateTeacher />
          <CreateTeacher />
          <CreateTeacher />
          <CreateTeacher />
          <CreateTeacher />
        </div>
      </div>
    </div>
  );
};

export default Main;
