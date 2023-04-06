import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import modalReducer from "./modalSlice";
import imageReducer from "./imageSlice";

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
  image: {
    diyImage: null,
  },
};

const store = configureStore({
  reducer: {
    login: loginReducer,
    modal: modalReducer,
    image: imageReducer,
  },
  preloadedState: initialState,
});

export default store;
