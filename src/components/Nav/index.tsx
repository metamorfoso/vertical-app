import React from 'react'
import { Link } from '@react-navigation/native'
import { XStack } from 'tamagui'

const Nav = () => {
  return (
    <XStack style={{ height: 40, width: '100%' }}>
      <Link to={{ screen: 'Home' }}>Home</Link>
      <Link to={{ screen: 'Debug' }}>Debug</Link>
    </XStack>
  )
}

export default Nav
