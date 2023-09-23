import { configureStore } from '@reduxjs/toolkit'

import position from '../components/RecordPosition/positionSlice'

export const store = configureStore({
  reducer: {
    position
  },
  devTools: {

  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
