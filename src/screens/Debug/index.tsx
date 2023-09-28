import React from 'react'
import { Button } from 'tamagui'

import { useAppSelector } from '../../redux/hooks'
import { persistor } from '../../redux/store'

// make persistor available from debugger console in dev
if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  global.persistor = persistor
}

const Debug = () => {
  const positions = useAppSelector((state) => state.position.positions)

  const consolelogPositions = (): void => {
    console.log(positions)
  }

  const purgeAsyncStorage = () => {
    persistor?.purge()
  }

  return(
    <>
      <Button onPress={consolelogPositions}>Log Positions</Button>
      <Button onPress={purgeAsyncStorage}>Purge Async Storage</Button>
    </>
  )
}

export default Debug