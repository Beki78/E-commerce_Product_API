import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormType } from "../../types/types";

interface AuthState {
  user: FormType | null;
  isLoading: boolean;
  error: string | null;

}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<{ username: string; password: string }>
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<FormType>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    loginFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { login, loginSuccess, loginFailed } = authSlice.actions;

export default authSlice.reducer;
