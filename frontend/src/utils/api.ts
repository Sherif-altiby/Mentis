import axios from "axios";
import { RegisterProps } from "../types/index.types";

export const api = "http://127.0.0.1:8000/api";
export const serverUrl = "http://127.0.0.1:8000";

export const register = async ({ userName, parentName, userPhone, parentPhone, role, grade_level, }: RegisterProps) => {
  const apiUrl = `${api}/register`;
  try {
    const response = await axios.post(apiUrl, 
      { name: userName, parent_name: parentName, phone: userPhone, parent_phone: parentPhone, role, grade_level,});

    const data = await response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        return { error: true, message: errorMessage };
      } else {
        console.error("An unknown error occurred.");
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
};

export const getUserInfo = async (token: string) => {
  const apiUrl = `${api}/user-from-token/${token}`;
  const response = await axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = response.data;
  console.log(data);
  return data;
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const apiUrl = `${api}/login`;

  try{
    const response = await axios.post(apiUrl, {
      email,
      password,
    });
  
  
    const data = await response.data;
  
    return data;
  }catch(err){
    console.log(err)
  }
};

export const logout = async (token: string | null) => {
  const apiUrl = `${api}/logout`;

  const response = await axios.post(apiUrl, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  localStorage.clear();
  return response.data;
};

export const getAllQuizzes = async (token: string | null) => {
  const response = await axios.get(`${api}/quizzes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const sendStudentResponses = async (token: string | null,QuesId: number,answer: string,stdId: number) => {
  const response = await axios.post(
    `${api}/quiz-responses`,
    {
      quiz_question_id: QuesId,
      student_id: stdId,
      answer,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getUserQuizResponce = async ( token: string | null, studentId: number, quizId: number) => {
  const response = await axios.get(`${api}/student-results/${studentId}/quiz/${quizId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getFiles = async (token: string | null, id: number) => {
  const response = await axios.get(`${api}/files/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getQuizeTime = async (token: string | null, id: number) => {
  const responce = await axios.get(`${api}/quiz/${id}/timer`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return responce.data;
};

export const blockUser = async (token: string | null, id: number) => {
  try {
    const response = await axios.post(
      `${api}/block-user/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getAllStudents = async (token: string | null) => {
  try {
    const response = await axios.get(`${api}/students`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    return err;
  }
};

export const getAllBlockedUsers = async (token: string | null) => {
  try{
    const response = await axios.get(`${api}/getAllBlockedUsers`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch(err) {
    return err
  }
}

export const unBlockUser = async (token: string | null, userId: number) => {
  try{
    const response = await axios.post(`${api}/unblock-user/${userId}`,{}, {
      headers: {
       Authorization: `Bearer ${token}`
      }
   })
 
   return response.data;
  } catch(err) {
    return err
  }
}

export const isUserBlocked = async (token: string | null, userId: number) => {
  try{
    const response = await axios.get(`${api}/is-blocked/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  }catch(err){
    return err
  }
}