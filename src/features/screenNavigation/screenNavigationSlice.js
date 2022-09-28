import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "splash",
};

export const screenNavigationSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    authScreens: (state) => {
      state.value = "auth";
    },
    dashboardScreens: (state) => {
      state.value = "dashboard";
    },
    splashScreens: (state) => {
      state.value = "splash";
    },
  },
});

export const { authScreens, dashboardScreens, splashScreens } =
  screenNavigationSlice.actions;

export default screenNavigationSlice.reducer;
