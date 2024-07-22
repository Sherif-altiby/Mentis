import axios from "axios";
import { RegisterProps } from "../types/index.types";

export const register = async ({name, email, password, role, phone_number }: RegisterProps) => {
     
    const api = "http://127.0.0.1:8000/api/register";

    try {
        const response = await axios.post(api, {
          name,
          email,
          password,
          role,
          phone_number
        });
    
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('AxiosError:', error.message);
          console.error('Response data:', error.response?.data);
          console.error('Response status:', error.response?.status);
        } else {
          console.error('Unexpected error:', error);
        }
        throw error;
      }
    };
