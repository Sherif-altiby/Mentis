import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "../pages/loading/Loadingslice";
import tokenReducer from "../auth/tokenSlice";
import teacherReducer from "../components/Main/teacherSlice";
import userInfoReducer from "../components/Navbar/userInfo";
import themeReducer from "../components/userDashboardComponents/setting/settingSlice";
import videoReducer from "../pages/videoplayer/videoSlice";
import courseLengthReducer from "../components/TeacherComponents/courses/coursesSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    token: tokenReducer,
    teacher: teacherReducer,
    userInfo: userInfoReducer,
    mentisusertheme: themeReducer,
    videoId: videoReducer,
    coursesLevelsTeacher: courseLengthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
