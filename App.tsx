import React from 'react'
import 'react-native-devsettings/withAsyncStorage'
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native'
import { Provider } from 'react-redux'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { YStack, Theme, TamaguiProvider } from 'tamagui'
import { PersistGate } from 'redux-persist/integration/react'

import tamaguiConfig from './tamagui.config'
import RecordPosition from './src/components/RecordPosition'
import { store as reduxStore, persistor } from './src/redux/store'
import Altitude from './src/components/Altitude'
import Vertical from './src/components/Vertical'

function App (): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  }
  global.persistor = persistor // TODO: only do this in dev (allows purging storage from debugger console)
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Provider store={reduxStore}>
        <PersistGate loading={null} persistor={persistor}>
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
                <Vertical />
                <Altitude />
                <RecordPosition />
              </YStack>
            </Theme>
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </TamaguiProvider>
  )
}

export default App
