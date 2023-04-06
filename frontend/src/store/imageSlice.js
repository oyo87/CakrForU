import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name: "image",
  initialState: {
    diyImage: null,
  },
  reducers: {
    setDiyImage: (state, action) => {
      state.diyImage = action.payload;
    },
  },
});

export const { setDiyImage } = imageSlice.actions;
export default imageSlice.reducer;
