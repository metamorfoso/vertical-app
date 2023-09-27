import { PositionType } from '../types/position'
import { reduceToArraySortedByTimestamp } from './calculateVertical'
import data150down25up120down from './calculateVertical/testData/150down25up120down'

interface BuildTransformPositionConfig {
  transform: boolean
}

const buildPositionTransformer = ({ transform }: BuildTransformPositionConfig) => {
  const altitudeData = reduceToArraySortedByTimestamp(data150down25up120down)

  // xcode Simulator geolocation data always has 0 for altitude
  // Augmenting the mock Simulator data with altitude values from test data
  let transformIndex = 0

  return (originalPosition: PositionType) => {
    if (!transform) {
      return originalPosition
    }

    const position = {
      ...originalPosition,
    }

    if (altitudeData[transformIndex]?.coords?.altitude != null) {
      position.coords.altitude = altitudeData[transformIndex].coords.altitude
      transformIndex = transformIndex + 1
    }

    return position
  }
}

export const overwriteAltitudeInDev = buildPositionTransformer({
  transform: process.env.NODE_ENV === 'development'
})
