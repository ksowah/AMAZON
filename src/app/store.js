import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/user/UserSlice';

export const store = configureStore({
  reducer: {
      user: userSlice,
  },
});


