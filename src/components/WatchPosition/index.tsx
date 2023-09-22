import React, { useLayoutEffect, useRef, useState } from "react";
import Geolocation from "@react-native-community/geolocation";
import { Alert } from "react-native";

import { useAppDispatch } from '../../redux/hooks'

import { add } from './positionSlice'

import { PositionType } from "../../types/position";
import Altitude from "../Altitude";

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
})

const useInitWatchPosition = () => {
  const watchIdRef = useRef<number>()
  // const [position, setPosition] = useState<PositionType>();
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        console.log(position)
        // setPosition(position)
        dispatch(add(position))
      },
      error => {
        Alert.alert('Geolocation failed', error.message);
      },
      {
        enableHighAccuracy: true, // true forces GPS (false allows WIFI)
        distanceFilter: 25,
        // useSignificantChanges: true, // needs experimentation -- possibly omits too many datapoints
      }
    );

    watchIdRef.current = watchId

    return () => {
      if (watchIdRef.current) {
        Geolocation.clearWatch(watchIdRef.current)
      }
    }
  }, []);

  // return position
}

const WatchPosition = () => {
  useInitWatchPosition()

  return <></>;
  // return <>{position && <Altitude position={position} />}</>;
};

export default WatchPosition