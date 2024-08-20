import axios from "axios";

const api = "http://127.0.0.1:8000/api"

export  const getTeacherAllCourses = async (teacherId: string | null, token: string | null, level: string | null) => {
    const response = await axios.get(`${api}/course-contents/teacher/${teacherId}/level/${level}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}

export const createQuize = async (token: string | null, course_id: string | undefined, title: string, grade_level: string) => { 
    const response = await axios.post(`${api}/quizzes`, 
        {
            course_id: course_id,
            title: title,
            type: "multiple_choice",
            grade_level: grade_level
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data; 
};


export const createQuizeQuestion = async (token: string | null, quiz_id: string, question: string, a: string, b:string, c: string, d: string) => { 
    const response = await axios.post(`${api}/quizzes`, 
        {
            quiz_id: quiz_id,
            question: question,
            options: {
               a,
               b,
               c,
               d
            },
            correct_answer: d
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data; 
};
