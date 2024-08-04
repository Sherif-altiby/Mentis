import { Link } from "react-router-dom";
import MainHeader from "../mainheader/MainHeader";
import math from "../../assets/math.png";
import phiscs from "../../assets/phiscs.jpg";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import chemistry from "../../assets/chemistry.jpg";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import introImg from '../../assets/intro-img-2.png'
import { motion } from "framer-motion";

 
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Circles from "../animation/Circles";
import { card, dataType } from "../../types/index.types";
import CreateTeacherCard from "../createTeacherCard/CreateTeacherCard";


import { useAppSelector, useAppDispatch } from "../../redux/reduxHook";
import axios from "axios";
import { useEffect } from "react";

import { setAllTeachers } from "./teacherSlice";

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
             
            <img src={data.img} alt="" /> 
          </div>
          <h3> {data.title} </h3>
        </div>
      </Link>
    </>
  );
};

 
const Main = () => {

 
  const dispatch = useAppDispatch()

  const token = useAppSelector((state) => state.token.token)
  const allTeacher = useAppSelector((state) => state.teacher.teachers)

  
  const [text] = useTypewriter({
    words: ["منصة منتس التعليمية ", "حيث الريادة و التفوق و الدرجات النهائية"],
    loop: true,
    typeSpeed: 20,
    deleteSpeed: 50
  });

  const getAllTeacher = async () => {
     
    const response = await axios.get("http://127.0.0.1:8000/api/teachers", {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })

     if(allTeacher.length === 0){
      dispatch(setAllTeachers
        (response.data))
     }
     console.log(allTeacher.length)

  }

  useEffect(() => { getAllTeacher() }, [token]);

  return (
    <div>
      <div className="main-section">
        <Circles />

        <div className="intro-section">
           <motion.div className="img"
            animate={{ bottom: [-50, 80, -50] }}
            transition={{duration: 5, repeat: Infinity}}
           > <img src={introImg} alt="" /> </motion.div>

           <div className="text">
             <h2> <span> <Cursor /> </span> <span> { text } </span> </h2>
             <p> منصة تعليمية مبتكرة تهدف إلى توفير تجربة تعليمية متكاملة وشاملة للمستخدمين من جميع الأعمار والخلفيات. تعتمد "منتس" على أحدث التقنيات التعليمية لخلق بيئة تعلم تفاعلية وجذابة، حيث يمكن للمتعلمين الوصول إلى مجموعة متنوعة من الموارد والدورات التدريبية المصممة بعناية لتلبية احتياجاتهم التعليمية. </p>
             <div className="btns">
                <div className="btn"> <a href='#all-mentis-materials' > المواد الدراسية </a> </div>
                <div className="btn"> <a href='#all-mentis-teachers' >  المدرسين </a> </div>
                <div className="btn"> <Link to='/signup' >  انضم الي منتس </Link> </div>
             </div>
           </div>
        </div>

        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
        <div className="wave wave-4"></div>

      </div>

      <div className="all-materials" id='all-mentis-materials' >
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

      <div className="all-teachers" id="all-mentis-teachers" >
        <MainHeader title="المدرسين" />
        <div className="teachers">
           {allTeacher?.map((teacher) => ( 
            <CreateTeacherCard 
                email={teacher.email} 
                id={teacher.id} 
                name={teacher.name} 
                phone_number={teacher.phone_number} 
                role={teacher.role} 
                key={teacher.id}
            />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
