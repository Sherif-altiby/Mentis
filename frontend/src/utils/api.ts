import axios from "axios";
import { RegisterProps } from "../types/index.types";
 

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

  const data = await response.data;

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