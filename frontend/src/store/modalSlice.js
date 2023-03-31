import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    portfolio: null,
    portfolioOpen: false,
    addressOpen: false,
  },
  reducers: {
    setPortfolio: (state, action) => {
      state.portfolio = action.payload;
    },
    openPortfolio: (state) => {
      state.portfolioOpen = true;
    },
    closePortfolio: (state) => {
      state.portfolioOpen = false;
    },
    openAddress: (state) => {
      state.addressOpen = true;
    },
    closeAddress: (state) => {
      state.addressOpen = false;
    },
  },
});

export const {
  setPortfolio,
  openPortfolio,
  closePortfolio,
  openAddress,
  closeAddress,
} = modalSlice.actions;

export default modalSlice.reducer;
