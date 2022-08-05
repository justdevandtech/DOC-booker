import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";


const initialState = {
    isOpen: false,
    isLoading: false,
    logOutScreen: false,
    constactDOCModal: false,
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
    },
    openContactDOCModal: (state) => {
      state.constactDOCModal = true;
    },
    closeContactDOCModal: (state) => {
      state.constactDOCModal = false;
    }
  },
  extraReducers: builder => {},
});

export const {
  userIsLogout,
  userIsNotLogout,
  openContactDOCModal,
  closeContactDOCModal,
} = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
export default modalSlice.reducer;
