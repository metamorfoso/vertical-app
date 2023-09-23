import React from 'react'
import 'react-native-devsettings/withAsyncStorage'
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native'
import { Provider } from 'react-redux'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { YStack, Theme, TamaguiProvider } from 'tamagui'

import tamaguiConfig from './tamagui.config'
import RecordPosition from './src/components/RecordPosition'
import { store as reduxStore } from './src/redux/store'
import Altitude from './src/components/Altitude'

function App (): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Provider store={reduxStore}>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Theme name='light'>
            <YStack
              style={{ height: '100%', width: '100%' }}
              alignItems='center'
              justifyContent='center'
              gap='$5'
              backgroundColor='$color.pink4Light'
            >
              <Altitude />
              <RecordPosition />
            </YStack>
          </Theme>
        </SafeAreaView>
      </Provider>
    </TamaguiProvider>
  )
}

export default App
