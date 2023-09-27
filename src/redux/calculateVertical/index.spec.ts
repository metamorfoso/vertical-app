import { describe, it, expect } from '@jest/globals'

import data40down5up65down from './testData/40down5up65down'
import data150down25up120down from './testData/150down25up120down'

import calculateVertical, { reduceToArraySortedByTimestamp } from '.'

describe('reduceToArraySortedByTimestamp', () => {
  it('returns array of positions sorted by timestamp, earliest to latest', () => {
    const result = reduceToArraySortedByTimestamp(data150down25up120down)

    expect(result[0].timestamp).toEqual(1695626928614.9092)
    expect(result[result.length - 1].timestamp).toEqual(1695627180650.113)
  })
})

describe('calculate vertical', () => {
  it.each([
    [data40down5up65down, { ascent: 5, descent: 105 } as const],
    [data150down25up120down, { ascent: 25, descent: 270 } as const]
  ])('calculates total ascent and total descent', (data, expectedVertical) => {
    const result = calculateVertical(data)

    expect(result).toEqual(expectedVertical)
  })
})
