import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";


const initialState = {
    isOpen: false,
    isLoading: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {},
  extraReducers: builder => {},
});

export const {} = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
export default modalSlice.reducer;
