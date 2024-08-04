import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TeacherProps } from "../../types/index.types";

export interface TeacherState {
  teachers: TeacherProps[];
}

const initialState: TeacherState = {
  teachers: []
};

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setAllTeachers: (state, action: PayloadAction<TeacherProps[]>) => {
      return { ...state, teachers: action.payload };
    }
  }
});

export const { setAllTeachers } = teacherSlice.actions;
export default teacherSlice.reducer;
