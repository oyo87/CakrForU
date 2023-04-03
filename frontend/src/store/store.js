import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import modalReducer from "./modalSlice";

const initialState = {
  login: {
    user: JSON.parse(localStorage.getItem("user")),
    userType: "buyer",
  },
  modal: {
    portfolio: null,
    portfolioOpen: false,
    addressOpen: false,
    buyerOrderSheet: null,
    orderOpen: false,
    buyerOrderOpen: false,
  },
};

const store = configureStore({
  reducer: {
    login: loginReducer,
    modal: modalReducer,
  },
  preloadedState: initialState,
});

export default store;
