 
import MainHeader from '../../components/mainheader/MainHeader'
import './Home.scss';
import math from '../../assets/math.png';
import phiscs from '../../assets/phiscs.jpg';
import chemistry from '../../assets/chemistry.jpg'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import 'swiper/swiper-bundle.css'; // Import Swiper styles

import 'swiper/css/navigation';
import 'swiper/css/pagination';
 import 'swiper/css/autoplay';
import { Link } from 'react-router-dom';
 
 
type card= {id: number, title: string, img: string}
type dataType =  card []

const data: dataType = [
    {
        id: 1,
        title: 'الكمياء',
        img: chemistry
    },
    {
        id: 2,
        title: 'الفزياء',
        img: phiscs
    },
    {
        id: 5,
        title: 'الرياضايت',
        img: math
    },
    {
        id: 5,
        title: 'الرياضايت',
        img: math
    },
    {
        id: 5,
        title: 'الرياضايت',
        img: math
    },
    {
        id: 5,
        title: 'الرياضايت',
        img: math
    },
    {
        id: 5,
        title: 'الرياضايت',
        img: math
    },
    {
        id: 6,
        title: 'الرياضايت',
        img: math
    },
    {
        id: 3,
        title: 'الرياض ايت',
        img: math
    },
]

const CreateMaterial = ( {data}: {data: card} ) => {
    return<>
        <Link to='/' >
                    <div className="material">
                        <div className="img"> <img src={data.img} alt="" /> </div>
                        <h3> {data.title} </h3>
                    </div>
        </Link>
     </>
}

const CreateTeacher = () => {
    return <>
       <Link to='/' >
             <div className="teacher-card">
                <div className="img"> <img src={phiscs} alt="" /> </div>
                <h2> أ/ محمد عبد النور </h2>
                <p> كمياء </p>
             </div>
       </Link>
    </>
}

const Home = () => {
  return (
    <>
        <div className="main-section">
            <div className="wave wave-1"></div>
            <div className="wave wave-2"></div>
            <div className="wave wave-3"></div>
            <div className="wave wave-4"></div>
        </div>

        <div className="all-materials">
             <MainHeader title='المواد الدراسية' />
           
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
         {data.map(item => (
                     <SwiperSlide>
                        <CreateMaterial data={item} />
                    </SwiperSlide>
             ))}
           </Swiper>
          </div>
        </div>

        <div className="all-teachers">
            <MainHeader title='المدرسين' />
             <div className="teachers">
                  <CreateTeacher />
                  <CreateTeacher />
                  <CreateTeacher />
                  <CreateTeacher />
                  <CreateTeacher />
             </div>
        </div>
    </>
  )
}

export default Home