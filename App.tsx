/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Provider } from 'react-redux'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { YStack, Theme, TamaguiProvider } from 'tamagui';

import tamaguiConfig from './tamagui.config'
import WatchPosition from './src/components/WatchPosition';
import { store as reduxStore } from './src/redux/store'
import Altitude from './src/components/Altitude';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Provider store={reduxStore}>
        <WatchPosition />
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Theme name="light">
            <YStack
              style={{height: '100%', width: '100%'}}
              alignItems="center"
              justifyContent="center"
              backgroundColor="$color.pink4Light">
                <Altitude />
            </YStack>
          </Theme>
        </SafeAreaView>
      </Provider>
    </TamaguiProvider>
  );
}

export default App;
