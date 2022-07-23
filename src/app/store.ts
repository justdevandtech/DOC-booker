import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import modalReducer from "../features/modal/modalSlice";
import indexReducer from "../features/common/indexSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    index: indexReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
