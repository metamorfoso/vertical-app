import React, { useLayoutEffect, useRef, useState } from 'react'
import Geolocation from '@react-native-community/geolocation'
import { Alert } from 'react-native'
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
  const watchIdRef = useRef<number>()
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        console.log(position)

        if (isRecording) {
          dispatch(add(position))
        }
      },
      error => {
        Alert.alert('Geolocation failed', error.message)
      },
      {
        enableHighAccuracy: true, // true forces GPS (false allows WIFI)
        distanceFilter: 25
        // useSignificantChanges: true, // needs experimentation -- possibly omits too many datapoints
      }
    )

    watchIdRef.current = watchId

    return () => {
      if (typeof watchIdRef.current === 'number') {
        Geolocation.clearWatch(watchIdRef.current)
      }
    }
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
