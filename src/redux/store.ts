import { combineReducers, configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  persistStore, persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'

import position from './positionSlice'
import { listenerMiddleware } from './listenerMiddleware'

const persistConfigGlobal = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['position']
}

const combinedReducers = combineReducers({
  position: persistReducer({
    key: 'position',
    storage: AsyncStorage,
    whitelist: ['positions', 'history']
  }, position)
})

const reducer = persistReducer(persistConfigGlobal, combinedReducers)

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        // redux-persist seems to write objects that aren't strictly serializable to the store
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).prepend(listenerMiddleware.middleware)
  },
  devTools: true // TODO: change before shipping
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
