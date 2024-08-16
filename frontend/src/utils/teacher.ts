import axios from "axios"

export  const getTeacherAllCourses = async (teacherId: string | null, token: string | null, level: string | null) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/course-contents/teacher/${teacherId}/level/${level}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}