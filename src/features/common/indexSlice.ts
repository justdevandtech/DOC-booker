import { createSlice } from "@reduxjs/toolkit";
import { RootState} from "../../app/store";

interface ImodalProps {
  isOpen: boolean;
  sideBarIsToggled : boolean;
}

const initialState: ImodalProps = {
  isOpen: false,
  sideBarIsToggled: false,
};

export const indexSlice = createSlice({
  name: "index",
  initialState,
  reducers: {
    toggle: (state: ImodalProps) => {
      state.sideBarIsToggled = !state.sideBarIsToggled;
    },
  },
  extraReducers: builder => {},
});

export const { toggle } = indexSlice.actions;
export const selectIndex = (state: RootState) => state.index;
export default indexSlice.reducer;
