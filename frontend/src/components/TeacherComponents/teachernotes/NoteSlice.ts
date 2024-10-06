import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NoteInterface {
  course_id: number;
  file_id: number;
  file_path: string;
  level: string;
  title: string;
}

const loadFromLocalStorage = (): NoteInterface[] => {
  const savedNotes = localStorage.getItem("allNotes");
  return savedNotes ? JSON.parse(savedNotes) : [];
};

const initialState = {
  allNotes: loadFromLocalStorage() as NoteInterface[],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<NoteInterface[]>) => {
      state.allNotes = action.payload;

      localStorage.setItem("allNotes", JSON.stringify(state.allNotes));
    },
  },
});

export const { addNote } = notesSlice.actions;

export default notesSlice.reducer;
