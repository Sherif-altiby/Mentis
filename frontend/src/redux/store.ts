import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from "../pages/loading/Loadingslice";
import tokenReducer from "../auth/tokenSlice";
import teacherReducer from "../components/Main/teacherSlice";
import userInfoReducer from "../components/Navbar/userInfo"
import themeReducer from "../components/userDashboardComponents/setting/settingSlice"

export const store = configureStore({
    reducer: {
      loading: loadingReducer,
      token: tokenReducer,
      teacher: teacherReducer,
      userInfo: userInfoReducer,
      mentisusertheme: themeReducer,
     }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;