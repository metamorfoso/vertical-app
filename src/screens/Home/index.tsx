import React from 'react'
import { YStack } from 'tamagui'

import Altitude from '../../components/Altitude'
import Vertical from '../../components/Vertical'
import RecordPosition from '../../components/RecordPosition'

const HomeScreen = () => {
  return (
    <YStack
      style={{ height: '100%', width: '100%' }}
      alignItems='center'
      justifyContent='center'
      gap='$5'
    >
      <Vertical />
      <Altitude />
      <RecordPosition />
    </YStack>
  )
}

export default HomeScreen