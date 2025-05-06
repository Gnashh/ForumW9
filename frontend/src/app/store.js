import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../slices/taskSlice';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});