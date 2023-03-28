import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
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
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
