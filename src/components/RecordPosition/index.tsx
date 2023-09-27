import React from 'react'
import { Button, YStack } from 'tamagui'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { recordingStarted, recordingStopped, selectIsRecording } from '../../redux/positionSlice'

const RecordPosition: React.FC = () => {
  const dispatch = useAppDispatch()

  const isRecording = useAppSelector(selectIsRecording)

  const positions = useAppSelector((state) => state.position.positions)

  const toggleRecording = (): void => {
    if (isRecording) {
      dispatch(recordingStopped())
    } else {
      dispatch(recordingStarted())
    }
  }

  const buttonText = isRecording ? 'Stop' : 'Start'

  const consolelogPositions = (): void => {
    console.log(positions)
  }

  return (
    <YStack>
      <Button onPress={toggleRecording}>{buttonText}</Button>

      <Button onPress={consolelogPositions}>Log Positions</Button>
    </YStack>
  )
}

export default RecordPosition
