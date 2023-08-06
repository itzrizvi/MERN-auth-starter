import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserInfo = string | null;
export interface AuthState {
  userInfo: UserInfo;
}
type SetCredentialsPayload = UserInfo;

export const initialState: { userInfo: UserInfo } = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state: AuthState,
      action: PayloadAction<SetCredentialsPayload>,
    ) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state: AuthState) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
