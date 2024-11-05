import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { quizeProps } from "../../types/index.types";



export interface QuizeInterface {
    quizzes: quizeProps[]
}

const initialState: QuizeInterface = {
   quizzes: JSON.parse(localStorage.getItem('quizzes') || '[]')
}

const QuizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
         setAllQuizzes: (state, action: PayloadAction<quizeProps[]>) => {
                 state.quizzes = action.payload;
                 localStorage.setItem('quizzes', JSON.stringify(action.payload))
        }
    }
})


export const { setAllQuizzes } = QuizzesSlice.actions;
export default QuizzesSlice.reducer;