import { createSlice } from "@reduxjs/toolkit";

export interface mentisUserTheme {
    mentisUserTheme: string;
}

const initialState: mentisUserTheme = {
    mentisUserTheme: localStorage.getItem("usertheme") || ""
};

const settingSlice = createSlice({
    name: "mentisusertheme",
    initialState,
    reducers: {
        setDarkTheme: (state) => {
            state.mentisUserTheme = "dark";
            localStorage.setItem("usertheme", state.mentisUserTheme);
        },
        setLightTheme: (state) => {
            state.mentisUserTheme = "";
            localStorage.setItem("usertheme", state.mentisUserTheme);
        }
    }
});

export const { setDarkTheme, setLightTheme } = settingSlice.actions;
export default settingSlice.reducer;
