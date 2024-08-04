import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface TokenState {
    token: string | null ;
  }

  const initialState: TokenState = {
    token: localStorage.getItem("mentisID")
  }

 const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            localStorage.setItem("mentisID", action.payload)
            state.token = action.payload
        }
    }
 })

 export const {setToken} = tokenSlice.actions;
 export default tokenSlice.reducer;