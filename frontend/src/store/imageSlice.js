import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name: "image",
  initialState: {
    diyImage: localStorage.getItem("diyImage") || null,
    sellerId: null,
  },
  reducers: {
    setDiyImage: (state, action) => {
      state.diyImage = action.payload;
    },
    setSellerId: (state, action) => {
      state.sellerId = action.payload;
    },
  },
});

export const { setDiyImage, setSellerId } = imageSlice.actions;
export default imageSlice.reducer;
