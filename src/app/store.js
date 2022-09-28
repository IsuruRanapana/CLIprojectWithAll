import {configureStore} from '@reduxjs/toolkit';
import loaderReducer from '../features/loadingSpinner/loadingSpinnerSlice';
import authReducer from '../features/auth/authSlice';
import apiLoadingReducer from '../features/APIloading/apiLoadingSlice';
import screenReducer from '../features/screenNavigation/screenNavigationSlice';

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    auther: authReducer,
    apiLoader: apiLoadingReducer,
    screener: screenReducer,
  },
});
