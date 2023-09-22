import React from 'react'
import { Text } from 'tamagui';

import { useAppSelector } from '../../redux/hooks'
import { selectLatestPosition } from '../WatchPosition/positionSlice'

const Altitude = () => {
  const position = useAppSelector(selectLatestPosition)

  return <Text>Altitude: {position?.coords?.altitude}</Text>;
}

export default Altitude