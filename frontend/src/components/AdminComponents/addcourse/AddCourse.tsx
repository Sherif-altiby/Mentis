import './AddCourse.scss'

import axios from "axios"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHook"
import { TeacherProps } from "../../../types/index.types"
import { setLoading } from '../../../pages/loading/Loadingslice'
import Loading from '../../../pages/loading/Loading'

const AddCourse = () => {

    const token = useAppSelector((state) => state.token.token)
    const loading = useAppSelector((state) => state.loading.isLoading)

    const dispatch = useAppDispatch()

    const [teachers, setTeachers] = useState<TeacherProps[]>()

    const [courseName, setCourseName] = useState("");
    const [courseDesc, setCourseDeesc] = useState("")
    const [coursePrice, setCoursePrice] = useState("")
    const [teacherId, setTeacherId] = useState<number>(0)

    useEffect( () => {

        const getAllTeachers = async () => {
            const response = await axios.get("http://127.0.0.1:8000/api/teachers", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data)
            setTeachers(response.data)
        }

        getAllTeachers()
    }, []);

    const handelAddCours = async () => {
        if(courseName.length > 0 && courseDesc.length > 0 && coursePrice.length > 0 && teacherId > 0){

            dispatch(setLoading(true));
            console.log("true")

            const response = await axios.post("http://127.0.0.1:8000/api/courses", {
                title: courseName,
                description: courseDesc,
                price: coursePrice,
                teacher_id: teacherId
            },{
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })

            if(response.data.status === "success"){
                dispatch(setLoading(false))
            } else {
                dispatch(setLoading(false))
            }

        }else{
            console.log("failed")
        }
    }

  return (
    <div className="add-course-admin" >
         <h1> إضافة كورس </h1>

         <div className="add-course-section">

          {loading ? <Loading /> : (
            <>
               <div className="input-container">
                <div className="input">
                    <label htmlFor="course-name"> إسم المادة </label>
                    <input type="text" id="course-name" onChange={(e) => setCourseName(e.target.value)} />
                </div>
                <div className="input">
                    <label htmlFor="course-desc"> الشرح </label>
                    <input type="text" id="course-desc" onChange={(e) => setCourseDeesc(e.target.value)} />
                </div>
            </div>
            <div className="input-container">
                <div className="input">
                    <label htmlFor="course-price"> سعر المادة </label>
                    <input type="number" id="course-price" onChange={(e) => setCoursePrice(e.target.value)} />
                </div>
                <div className="input">
                    <label htmlFor="course-teacher-name"> اختر المدرس </label>
                    <select id="course-teacher-name" onChange={(e) => setTeacherId(Number(e.target.value))} >
                        {teachers?.map((teacher) => (
                            <option value={teacher.id} > {teacher.name} </option>
                        ))}
                    </select>
                 </div>
            </div>
            </>
          )}   
        
          <div className="add-btn" onClick={handelAddCours} > إضافة </div>

         </div>
    </div>
  )
}

export default AddCourse