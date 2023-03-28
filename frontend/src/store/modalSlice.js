import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    portfolioOpen: false,
  },
  reducers: {
    openPortfolio: (state) => {
      state.portfolioOpen = true;
    },
    closePortfolio: (state) => {
      state.portfolioOpen = false;
    },
  },
});

export const { openPortfolio, closePortfolio } = modalSlice.actions;

export default modalSlice.reducer;
