import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  author: [],
};

export const authorSlice = createSlice({
  name: "Author",
  initialState: initialState,
  reducers: {
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export const authorReducer = authorSlice.reducer;
