import { describe, it, expect } from '@jest/globals'

import dummyData from './dummyData'

import calculateVertical, { reduceToArraySortedByTimestamp } from '.'

describe('reduceToArraySortedByTimestamp', () => {
  it('returns array of positions sorted by timestamp, earliest to latest', () => {
    const result = reduceToArraySortedByTimestamp(dummyData)

    expect(result[0].timestamp).toEqual(1695626928614.9092)
    expect(result[result.length - 1].timestamp).toEqual(1695627180650.113)
  })
})

describe('calculate vertical', () => {
  // descent from 1000m to 900m, then ascent from 900m to 905m
  const arg = {
    1695626928614.9092: {
      mocked: true,
      coords: {
        speed: 3.74,
        longitude: -122.03048154,
        latitude: 37.33181512,
        accuracy: 10,
        heading: 263.65,
        altitude: 1000,
        altitudeAccuracy: -1
      },
      timestamp: 1695626928614.9092
    },
    11695626932614.9092: {
      mocked: true,
      coords: {
        speed: 3.74,
        longitude: -122.03048154,
        latitude: 37.33181512,
        accuracy: 10,
        heading: 263.65,
        altitude: 980,
        altitudeAccuracy: -1
      },
      timestamp: 11695626932614.9092
    },
    161695627019656.838: {
      mocked: true,
      coords: {
        speed: 3.36,
        longitude: -122.02826665,
        latitude: 37.33033364,
        accuracy: 10,
        heading: 109.06,
        altitude: 960,
        altitudeAccuracy: -1
      },
      timestamp: 161695627019656.838
    },
    1691695627026647.466: {
      mocked: true,
      coords: {
        speed: 4.2,
        longitude: -122.02794361,
        latitude: 37.33027655,
        accuracy: 10,
        heading: 91.58,
        altitude: 965,
        altitudeAccuracy: -1
      },
      timestamp: 1691695627026647.466
    },
    16951695627032633.56: {
      mocked: true,
      coords: {
        speed: 4.13,
        longitude: -122.02763446,
        latitude: 37.33025622,
        accuracy: 10,
        heading: 92.98,
        altitude: 940,
        altitudeAccuracy: -1
      },
      timestamp: 16951695627032633.56
    },
    169561695627038649.8389: {
      mocked: true,
      coords: {
        speed: 4.12,
        longitude: -122.0273368,
        latitude: 37.33024947,
        accuracy: 10,
        heading: 89.41,
        altitude: 900,
        altitudeAccuracy: -1
      },
      timestamp: 169561695627038649.8389
    }
  }

  it('calculates total ascent and total descent', () => {
    const result = calculateVertical(arg)

    expect(result).toEqual({ ascent: 5, descent: 105 })
  })
})
