/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
})

const useWatchPosition = () => {
  const watchIdRef = useRef<number>()
  const [position, setPosition] = useState<GeolocationResponse>();

  useLayoutEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        setPosition(position)
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

  return position
}

const CurrentLocation = () => {
  const position = useWatchPosition()

  return (
    <View>
      <Text>Location: {JSON.stringify(position)}</Text>
    </View>
  );
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <CurrentLocation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
