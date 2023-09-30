import React from 'react'

import Altitude from '../../components/Altitude'
import Vertical from '../../components/Vertical'
import RecordPosition from '../../components/RecordPosition'
import Screen from '../../components/Screen'

const HomeScreen = () => {
  return (
    <Screen
      alignItems='center'
      justifyContent='center'
      gap='$5'
    >
      <Vertical />
      <Altitude />
      <RecordPosition />
    </Screen>
  )
}

export default HomeScreen