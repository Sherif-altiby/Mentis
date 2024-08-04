import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserInfoProps = {
  name: string;
  email: string;
  phone_number: string;
  role: string;
  user_id: number;
};

const initialState: { userInfo: UserInfoProps } = {
  userInfo: {
    name: "",
    email: "",
    phone_number: "",
    role: "",
    user_id: 0
  }
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfoProps>) => {
      state.userInfo = action.payload;
    }
  }
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
