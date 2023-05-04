import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteNote, getNotesByAuthor, postNote } from "./notesAPI";

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const getNotes = createAsyncThunk("notes/getNotes", getNotesByAuthor);
export const AddNewNote = createAsyncThunk("notes/addNewNote", postNote);
export const deleteOneNote = createAsyncThunk(
  "notes/deleteOneNote",
  deleteNote
);

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    logout: (state) => {
      state.notes = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.notes = null;
      })
      .addCase(AddNewNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddNewNote.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(AddNewNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteOneNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOneNote.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteOneNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = notesSlice.actions;
export default notesSlice.reducer;
