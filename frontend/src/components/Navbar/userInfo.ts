import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserInfoProps = {
  name: string;
  email: string;
  phone_number: string;
  role: string;
  user_id: number;
  grade_level: number;
};

 const loadUserInfo = (): UserInfoProps => {
  const storedUserInfo = localStorage.getItem("userInfo");
  return storedUserInfo ? JSON.parse(storedUserInfo) : {
    name: "",
    email: "",
    phone_number: "",
    role: "",
    user_id: 0,
    grade_level: 0
  };
};

const initialState: { userInfo: UserInfoProps } = {
  userInfo: loadUserInfo()
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfoProps>) => {
      state.userInfo = action.payload;
      // Save userInfo to localStorage
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    }
  }
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
