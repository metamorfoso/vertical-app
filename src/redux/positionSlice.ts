import { createSlice, createSelector } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Geolocation from '@react-native-community/geolocation'

import type { RootState } from './store'
import { PositionType } from '../types/position'
import { AppStartListening } from './listenerMiddleware'

import { overwriteAltitudeInDev } from './transformPosition'

interface PositionState {
  isRecording: boolean
  geolocationWatchId: number | null
  history: Array<PositionType['timestamp']>
  positions: Record<PositionType['timestamp'], PositionType>
}

const initialState: PositionState = {
  geolocationWatchId: null,
  isRecording: false,
  history: [],
  positions: {}
}

export const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    positionAdded: (state, action: PayloadAction<PositionType>) => {
      state.history.push(action.payload.timestamp)
      state.positions[action.payload.timestamp] = action.payload
    },
    recordingStarted: (state) => {
      state.isRecording = true
    },
    recordingStopped: (state) => {
      state.isRecording = false
    },
    geolocationWatchInitialized: (state, action: PayloadAction<{ geolocationWatchId: number }>) => {
      state.geolocationWatchId = action.payload.geolocationWatchId
    },
    geolocationWatchCleared: (state) => {
      state.geolocationWatchId = null
    }
  }
})

export const {
  positionAdded,
  geolocationWatchInitialized,
  geolocationWatchCleared,
  recordingStarted,
  recordingStopped
} = positionSlice.actions

export const addPositionListeners = (startListening: AppStartListening): void => {
  // initialize geolocation watch when recording starts
  startListening({
    actionCreator: recordingStarted,
    effect: (_, listenerApi) => {
      const geolocationWatchId = Geolocation.watchPosition(
        (nextPosition) => {
          const position = overwriteAltitudeInDev(nextPosition)

          console.log(position)
          listenerApi.dispatch(positionAdded(position))
        },
        (error) => {
          console.warn(error.message)
        },
        {
          enableHighAccuracy: true, // true forces GPS (false allows WIFI)
          distanceFilter: 25
          // useSignificantChanges: true, // needs experimentation -- possibly omits too many datapoints
        }
      )

      listenerApi.dispatch(geolocationWatchInitialized({ geolocationWatchId }))
    }
  })

  // clear geolocation watch when recording stops
  startListening({
    actionCreator: recordingStopped,
    effect: (_, listenerApi) => {
      const geolocationWatchId = selectGeolocationWatchId(listenerApi.getState())

      if (geolocationWatchId !== null) {
        Geolocation.clearWatch(geolocationWatchId)
      }

      listenerApi.dispatch(geolocationWatchCleared())
    }
  })
}

const selectPositionHistory = (state: RootState): number[] => state.position.history
const selectPositions = (state: RootState): Record<number, PositionType> => state.position.positions
const selectGeolocationWatchId = (state: RootState): number | null => state.position.geolocationWatchId

export const selectIsRecording = createSelector(
  (state: RootState) => state,
  (state): boolean => state.position.isRecording
)

export const selectLatestPosition = createSelector(
  selectPositionHistory,
  selectPositions,
  (history, positions) => {
    const [lastTimestamp] = history.slice(-1)
    return positions[lastTimestamp]
  }
)

export default positionSlice.reducer
