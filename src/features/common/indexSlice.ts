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
    setToggle: (state: ImodalProps, action: { payload: boolean }) => {
      state.sideBarIsToggled = action.payload;
    }
  },
  extraReducers: builder => {},
});

export const { toggle, setToggle } = indexSlice.actions;
export const selectIndex = (state: RootState) => state.index;
export default indexSlice.reducer;
