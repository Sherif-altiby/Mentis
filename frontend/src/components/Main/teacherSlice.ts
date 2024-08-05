import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllCoursesProps, TeacherProps } from "../../types/index.types";

export interface TeacherState {
  teachers: TeacherProps[];
  courses: AllCoursesProps[]
}

const initialState: TeacherState = {
  teachers: [],
  courses: []
};

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setAllTeachers: (state, action: PayloadAction<TeacherProps[]>) => {
      return { ...state, teachers: action.payload };
    },
    setAllCourses: (state, action: PayloadAction<AllCoursesProps[]>) =>{
       return {...state, courses: action.payload}
    }
  }
});

export const { setAllTeachers, setAllCourses } = teacherSlice.actions;
export default teacherSlice.reducer;
