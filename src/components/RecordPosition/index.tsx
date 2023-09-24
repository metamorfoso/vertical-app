import React, { useLayoutEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation'
import { Button, YStack } from 'tamagui'

import { useAppDispatch } from '../../redux/hooks'

import { add } from './positionSlice'

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true
})

const useRecordPosition = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isRecording, setIsRecording] = useState(false)
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    Geolocation.watchPosition(
      position => {
        console.log(position)

        if (isRecording) {
          dispatch(add(position))
        }
      },
      error => {
        console.warn(error.message)
      },
      {
        enableHighAccuracy: true, // true forces GPS (false allows WIFI)
        distanceFilter: 25
        // useSignificantChanges: true, // needs experimentation -- possibly omits too many datapoints
      }
    )
  }, [isRecording])

  return [isRecording, setIsRecording]
}

const RecordPosition: React.FC = () => {
  const [isRecording, setIsRecording] = useRecordPosition()

  const toggleRecording = (): void => setIsRecording(!isRecording)

  const buttonText = isRecording ? 'Stop' : 'Start'

  return (
    <YStack>
      <Button onPress={toggleRecording}>{buttonText}</Button>
    </YStack>
  )
}

export default RecordPosition
