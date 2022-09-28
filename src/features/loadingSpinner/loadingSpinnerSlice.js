import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const loadingSpinnerSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    loading: state => {
      state.value = true;
    },
    loaded: state => {
      state.value = false;
    },
  },
});

export const {loading, loaded} = loadingSpinnerSlice.actions;

export default loadingSpinnerSlice.reducer;
