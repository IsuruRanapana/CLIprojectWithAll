import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "splash",
};

export const authSlice = createSlice({
  name: "auther",
  initialState,
  reducers: {
    authFlow: (state) => {
      state.value = "authFlow";
    },
    dashboardFlow: (state) => {
      state.value = "dashboardFlow";
    },
  },
});

export const { authFlow, dashboardFlow } = authSlice.actions;

export default authSlice.reducer;
