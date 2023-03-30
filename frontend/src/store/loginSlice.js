import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    userType: "buyer",
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("access-token");
      localStorage.removeItem("user");
    },
    userType: (state, action) => {
      state.userType = action.payload;
    },
  },
});

export const { login, logout, userType } = loginSlice.actions;
export default loginSlice.reducer;
