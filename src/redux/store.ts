import { configureStore } from '@reduxjs/toolkit';

import position from '../components/WatchPosition/positionSlice';

export const store = configureStore({
  reducer: {
    position,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
