import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    portfolio: null,
    portfolioOpen: false,
    addressOpen: false,
    orderOpen: false,
    buyerOrderOpen: false,
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
    openOrder: (state) => {
      state.orderOpen = true;
    },
    closeOrder: (state) => {
      state.orderOpen = false;
    },
    setBuyerOrder: (state, action) => {
      state.buyerOrder = action.payload;
    },
    openBuyerOrder: (state) => {
      state.buyerOrderOpen = true;
    },
    closeBuyerOrder: (state) => {
      state.buyerOrderOpen = false;
    },
  },
});

export const {
  setPortfolio,
  openPortfolio,
  closePortfolio,
  openAddress,
  closeAddress,
  openOrder,
  closeOrder,
  setBuyerOrder,
  openBuyerOrder,
  closeBuyerOrder,
} = modalSlice.actions;

export default modalSlice.reducer;
