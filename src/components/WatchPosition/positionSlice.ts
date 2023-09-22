import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../redux/store';
import { PositionType } from '../../types/position';

interface PositionState {
  history: Array<PositionType['timestamp']>;
  positions: Record<PositionType['timestamp'], PositionType>;
}

const initialState: PositionState = {
  history: [],
  positions: {},
};

export const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<PositionType>) => {
      state.history.push(action.payload.timestamp);
      state.positions[action.payload.timestamp] = action.payload;
    },
  },
});

export const {add} = positionSlice.actions;

const selectPositionHistory = (state: RootState) => state.position.history;
const selectPositions = (state: RootState) => state.position.positions;

export const selectLatestPosition = createSelector(
  selectPositionHistory,
  selectPositions,
  (history, positions) => {
    const [lastTimestamp] = history.slice(-1);
    return positions[lastTimestamp];
  },
);

export default positionSlice.reducer;
