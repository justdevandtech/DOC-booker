import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";


const initialState = {
    isOpen: false,
    isLoading: false,
    logOutScreen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    userIsLogout: (state) => {
      state.logOutScreen = true;
    },
    userIsNotLogout: (state) => {
      state.logOutScreen = false;
    }
  },
  extraReducers: builder => {},
});

export const { userIsLogout, userIsNotLogout } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
export default modalSlice.reducer;
