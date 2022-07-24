import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IuserProps } from '../../interfaces/index';


const initialState = {
  user: null as IuserProps | null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IuserProps | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {},
});

export const { setUser } = authSlice.actions;
export const selectAuth = (state: RootState) => state.index;
export default authSlice.reducer;