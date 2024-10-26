import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IsUserBlocked {
    isBlocked: boolean;
}

const initialState: IsUserBlocked = {
    isBlocked: JSON.parse(localStorage.getItem("isBlocked") || "false"),
};

const blockedSlice = createSlice({
    name: "isBlocked",
    initialState,
    reducers: {
        setIsBlocked: (state, action: PayloadAction<boolean>) => {
            state.isBlocked = action.payload;
            localStorage.setItem("isBlocked", JSON.stringify(action.payload));
        }
    }
});

export const { setIsBlocked } = blockedSlice.actions;

export default blockedSlice.reducer