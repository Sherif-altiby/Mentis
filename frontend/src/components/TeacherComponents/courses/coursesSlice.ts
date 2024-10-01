import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for Course
export type CourseTypes = {
  id: number;
  course_id: number;
  title: string;
  image: any;
  file_path: string;
  level: string;
};

// Define the interface for the state
export interface CoursesInterface {
  firstCourseLevel: CourseTypes[];
  secondCourseLevel: CourseTypes[];
  thirdCourseLevel: CourseTypes[];
}

// Function to safely load from localStorage
const loadFromLocalStorage = (): CoursesInterface => {
  const firstLevel = localStorage.getItem("firstCourseLevel");
  const secondLevel = localStorage.getItem("secondCourseLevel");
  const thirdLevel = localStorage.getItem("thirdCourseLevel");

  return {
    firstCourseLevel: firstLevel ? safeParse(firstLevel) : [],
    secondCourseLevel: secondLevel ? safeParse(secondLevel) : [],
    thirdCourseLevel: thirdLevel ? safeParse(thirdLevel) : [],
  };
};

// Function to safely parse JSON and handle potential errors
const safeParse = (value: string): CourseTypes[] => {
  try {
    console.log(JSON.parse(value));
    return JSON.parse(value) !== "undefined" ? JSON.parse(value) : [];
  } catch (e) {
    return [];
  }
};

const initialState: CoursesInterface = loadFromLocalStorage();

const coursesSlice = createSlice({
  name: "coursesLevelsTeacher",
  initialState,
  reducers: {
    setFirstLevelCourses: (state, action: PayloadAction<CourseTypes[]>) => {
      state.firstCourseLevel = action.payload;
      localStorage.setItem(
        "firstCourseLevel",
        JSON.stringify(state.firstCourseLevel)
      );
    },
    setSecondLevelCourses: (state, action: PayloadAction<CourseTypes[]>) => {
      state.secondCourseLevel = action.payload;
      localStorage.setItem(
        "secondCourseLevel",
        JSON.stringify(state.secondCourseLevel)
      );
    },
    setThirdLevelCourses: (state, action: PayloadAction<CourseTypes[]>) => {
      state.thirdCourseLevel = action.payload;
      localStorage.setItem(
        "thirdCourseLevel",
        JSON.stringify(state.thirdCourseLevel)
      );
    },
  },
});

export const {
  setFirstLevelCourses,
  setSecondLevelCourses,
  setThirdLevelCourses,
} = coursesSlice.actions;

export default coursesSlice.reducer;
