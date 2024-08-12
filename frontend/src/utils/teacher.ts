import axios from "axios"

export  const getTeacherAllCourses = async (teacherId: string, token: string, level: string) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/course-contents/${teacherId}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}