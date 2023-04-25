import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNotesByAuthor } from "./notesAPI";

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const getNotes = createAsyncThunk("notes/getNotes", getNotesByAuthor);
export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    reset: (state) => {
      state.notes = null;
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
      });
  },
});
export const { reset } = notesSlice.actions;
export default notesSlice.reducer;
