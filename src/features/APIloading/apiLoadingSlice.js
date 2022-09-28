import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "loading",
};

export const apiLoadingSlice = createSlice({
  name: "apiLoader",
  initialState,
  reducers: {
    apiLoaded: (state) => {
      state.value = "loaded";
    },
    apiError: (state) => {
      state.value = "error";
    },
    apiLoading: (state) => {
      state.value = "loading";
    },
  },
});

export const { apiLoaded, apiError, apiLoading } = apiLoadingSlice.actions;

export default apiLoadingSlice.reducer;
