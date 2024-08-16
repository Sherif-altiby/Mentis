import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllCoursesProps, TeacherProps } from "../../types/index.types";

export interface TeacherState {
  teachers: TeacherProps[];
  courses: AllCoursesProps[]
}

// Load teachers and courses from localStorage if available
const loadState = (): TeacherState => {
  const storedTeachers = localStorage.getItem("teachers");
  const storedCourses = localStorage.getItem("courses");

  return {
    teachers: storedTeachers ? JSON.parse(storedTeachers) : [],
    courses: storedCourses ? JSON.parse(storedCourses) : [],
  };
};

const initialState: TeacherState = loadState();

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setAllTeachers: (state, action: PayloadAction<TeacherProps[]>) => {
      state.teachers = action.payload;
      // Save teachers to localStorage
      localStorage.setItem("teachers", JSON.stringify(state.teachers));
    },
    setAllCourses: (state, action: PayloadAction<AllCoursesProps[]>) => {
      state.courses = action.payload;
      // Save courses to localStorage
      localStorage.setItem("courses", JSON.stringify(state.courses));
    }
  }
});

export const { setAllTeachers, setAllCourses } = teacherSlice.actions;
export default teacherSlice.reducer;
