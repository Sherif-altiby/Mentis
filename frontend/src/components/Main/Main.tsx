import { Link } from "react-router-dom";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import introImg from "../../assets/intro-img-2.png";
import studentintroimg from "../../assets/student-intro-img-2.png";
import teacherintroimg from "../../assets/teacher-intro.png";
import { motion } from "framer-motion";

import CreateTeacherCard from "../createTeacherCard/CreateTeacherCard";

import { useAppSelector, useAppDispatch } from "../../redux/reduxHook";
import axios from "axios";
import { useEffect } from "react";

import { setAllTeachers } from "./teacherSlice";
import { api } from "../../utils/api";
import RadiaChart from "../charts/RadiaChart";

const Main = () => {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.token.token);
  const allTeacher = useAppSelector((state) => state.teacher.teachers);
  const userInfo = useAppSelector((state) => state.userInfo.userInfo);

  const [text] = useTypewriter({
    words: ["منصة منتس التعليمية ", "حيث الريادة و التفوق و الدرجات النهائية"],
    loop: true,
    typeSpeed: 20,
    deleteSpeed: 50,
  });

  const getAllTeacher = async () => {
    const response = await axios.get(`${api}/teachers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);

    dispatch(setAllTeachers(response.data));
  };

  useEffect(() => {
    getAllTeacher();
  }, [token]);

  return (
    <div>
      <div className={`main-section`}>
        <div className="intro-section">
          <motion.div
            className="img"
            animate={{ bottom: [-50, 80, -50] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <img
              src={
                userInfo.role === "student"
                  ? studentintroimg
                  : userInfo.role === "teacher"
                  ? teacherintroimg
                  : introImg
              }
              alt=""
            />
          </motion.div>

          <div className="text">
            {token ? (
              <>
                <h1>
                  <span> {userInfo.name} </span> مرحبا
                </h1>
                <p className="student-intro-p">
                  نتمني لك تجربة مشوقة وممتعة في التعلم
                </p>
              </>
            ) : (
              <>
                <h2>
                  <span>
                    <Cursor />
                  </span>
                  <span> {text} </span>
                </h2>
                <p>
                  منصة تعليمية مبتكرة تهدف إلى توفير تجربة تعليمية متكاملة
                  وشاملة للمستخدمين من جميع الأعمار والخلفيات. تعتمد "منتس" على
                  أحدث التقنيات التعليمية لخلق بيئة تعلم تفاعلية وجذابة، حيث
                  يمكن للمتعلمين الوصول إلى مجموعة متنوعة من الموارد والدورات
                  التدريبية المصممة بعناية لتلبية احتياجاتهم التعليمية.
                </p>
                <div className="btns">
                  <div className="btn">
                    <a href="#all-mentis-teachers"> المدرسين </a>
                  </div>
                  <div className="btn">
                    <Link to="/signup"> انضم الي منتس </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
        <div className="wave wave-4"></div>
      </div>

      <div className={`all-teachers`} id="all-mentis-teachers">
        <h1> المدرسين </h1>
        <div className="teachers">
          {allTeacher?.map((teacher) => (
            <CreateTeacherCard
              email={teacher.email}
              id={teacher.id}
              name={teacher.name}
              phone_number={teacher.phone_number}
              role={teacher.role}
              key={teacher.id}
              courses={teacher.courses}
              image={teacher.image}
            />
          ))}
        </div>
      </div>

     
    </div>
  );
};

export default Main;
