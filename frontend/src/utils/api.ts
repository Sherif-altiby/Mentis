import axios from "axios";
import { RegisterProps } from "../types/index.types";

const api = 'http://127.0.0.1:8000/api'

export const register = async ({
  userName,
  parentName,
  userPhone,
  parentPhone,
  role,
  grade_level
}: RegisterProps) => {
  const api = "http://127.0.0.1:8000/api/register";
  try {
    const response = await axios.post(api, {
      name: userName,
      parent_name: parentName,
      phone: userPhone,
      parent_phone: parentPhone,
      role,
      grade_level
    });

    const data = await response.data;
    console.log(data)
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {

      if (error.response && error.response.data) {

        const errorMessage = error.response.data.message;
        return { error: true, message: errorMessage };

       } else {
        console.error('An unknown error occurred.');
       }
    } else {
      console.error('An unexpected error occurred:', error);
     }
  }
};

export const getUserInfo = async (token: string) => {

 const api = `http://127.0.0.1:8000/api/user-from-token/${token}`
  const response = await axios.get(api, {
    headers:{
      'Authorization': `Bearer ${token}`,
    }
  })

  const data =  response.data;
  console.log(data)
  return data

}

export const login = async ( {email, password}: {email: string, password: string} ) => {
  const api = "http://127.0.0.1:8000/api/login";

  const response = await axios.post(api,{
       email,
      password
  })

  const data = await response.data

  return data
}

export const logout = async (token: string | null) => {
   const api = "http://127.0.0.1:8000/api/logout";

   const response = await axios.post(api, {
    headers:{
      'Authorization': `Bearer ${token}`,
    }
   })

   const data = response.data
   localStorage.clear()
}

export const getAllQuizzes = async (token: string | null) => {
  const response = await axios.get(`${api}/quizzes`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data;
}

export const sendStudentResponses = async (token: string | null, QuesId: number, answer: string, stdId: number) => {
  const response = await axios.post(`${api}/quiz-responses`, {
   quiz_question_id: QuesId,
   student_id: stdId,
   answer
  },{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data
}