import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    portfolioOpen: false,
    addressOpen: false,
  },
  reducers: {
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

export const { openPortfolio, closePortfolio, openAddress, closeAddress } =
  modalSlice.actions;

export default modalSlice.reducer;
