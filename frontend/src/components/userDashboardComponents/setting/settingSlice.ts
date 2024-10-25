import { createSlice } from "@reduxjs/toolkit";

export interface mentisUserTheme {
  mentisUserTheme: string;
}

const initialState: mentisUserTheme = {
  mentisUserTheme: localStorage.getItem("usertheme") || "",
};

const settingSlice = createSlice({
  name: "mentisusertheme",
  initialState,
  reducers: {
    setDarkTheme: (state) => {
      state.mentisUserTheme = state.mentisUserTheme != "dark" ? "dark" : "";
      localStorage.setItem("usertheme", state.mentisUserTheme);
    },
  },
});

export const { setDarkTheme } = settingSlice.actions;
export default settingSlice.reducer;
