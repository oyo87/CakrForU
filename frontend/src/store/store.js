import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";

const initialState = {
  login: {
    user: JSON.parse(localStorage.getItem("user")),
  },
};

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
  preloadedState: initialState,
});

export default store;
