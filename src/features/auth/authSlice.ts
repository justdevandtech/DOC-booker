import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

interface IuserProps {
    first_name: string;
    last_name: string;
    email: string;
}
const initialState = {
  user: null as IuserProps | null,
};

export const authSlice = createSlice({
  name: "modal",
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