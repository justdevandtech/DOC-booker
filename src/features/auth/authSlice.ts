import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface IuserProps {
    first_name: string;
    last_name: string;
    email: string;
    isAdmin: boolean;
}
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