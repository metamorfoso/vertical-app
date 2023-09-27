import { PositionType } from '../../types/position'

interface PositionsDict {
  [key: string]: PositionType
}

interface Vertical {
  ascent: number
  descent: number
}

const calculateVertical = (positionsList: PositionsList): Vertical => {
  return positionsList.reduce((acc, currentPos, index, list) => {
    const prevIndex = index - 1
    const prevPos = list[prevIndex]

    if (prevPos === undefined || prevPos === null || typeof prevPos?.coords?.altitude !== 'number' || typeof currentPos?.coords?.altitude !== 'number') {
      return acc
    }

    const altitudeDiff = currentPos?.coords?.altitude - prevPos?.coords?.altitude

    if (altitudeDiff > 0) {
      return {
        ...acc,
        ascent: acc.ascent + altitudeDiff
      }
    }

    if (altitudeDiff < 0) {
      return {
        ...acc,
        descent: acc.descent + Math.abs(altitudeDiff)
      }
    }

    return acc
  }, { ascent: 0, descent: 0 })
}

type PositionsList = PositionType[]

export const reduceToArraySortedByTimestamp = (positionsDict: PositionsDict): PositionsList => {
  return Object.values(positionsDict).sort((a, b) => a.timestamp > b.timestamp ? 1 : -1)
}

export default calculateVertical
