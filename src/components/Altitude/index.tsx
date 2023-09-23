import React from 'react'
import { Text } from 'tamagui'

import { useAppSelector } from '../../redux/hooks'
import { selectLatestPosition } from '../RecordPosition/positionSlice'

const Altitude: React.FC = () => {
  const position = useAppSelector(selectLatestPosition)

  return <Text>Altitude: {position?.coords?.altitude}</Text>
}

export default Altitude
