import React, { useLayoutEffect, useRef } from 'react'
import Geolocation from '@react-native-community/geolocation'
import { Alert } from 'react-native'

import { useAppDispatch } from '../../redux/hooks'

import { add } from './positionSlice'

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true
})

const useInitWatchPosition = (): void => {
  const watchIdRef = useRef<number>()
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        console.log(position)
        dispatch(add(position))
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
  }, [])
}

const WatchPosition: React.FC = () => {
  useInitWatchPosition()

  return <></>
  // return <>{position && <Altitude position={position} />}</>;
}

export default WatchPosition
