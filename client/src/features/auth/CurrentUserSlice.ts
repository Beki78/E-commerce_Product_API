import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string | null;
}

const initialState: UserState = {
  username: null,
};

const userSlice = createSlice({
  name: "currentuser",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
