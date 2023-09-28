import React from 'react'
import 'react-native-devsettings/withAsyncStorage'
import { Platform, SafeAreaView, StatusBar, useColorScheme } from 'react-native'
import { Provider } from 'react-redux'
import { Theme, TamaguiProvider, YStack, getTokens, Stack } from 'tamagui'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import tamaguiConfig from './tamagui.config'
import { store as reduxStore, persistor } from './src/redux/store'
import HomeScreen from './src/screens/Home'
import Debug from './src/screens/Debug'
import Nav from './src/components/Nav'

const NavigationStack = createNativeStackNavigator()

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

type StatusBarWrapperProps = {
  backgroundColor?: string
  barStyle?: React.ComponentProps<typeof StatusBar>['barStyle']
}

const StatusBarWrapper = ({ backgroundColor, ...props }: StatusBarWrapperProps) => (
  <Stack style={[{ height: APPBAR_HEIGHT }, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </Stack>
);

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  const styleTokens = getTokens()

  return (
    <NavigationContainer>
      <TamaguiProvider config={tamaguiConfig}>
        <Provider store={reduxStore}>
          <PersistGate loading={null} persistor={persistor}>
              <Theme name='light'>
                <StatusBarWrapper backgroundColor={styleTokens.color.pink8Dark.val} barStyle="light-content" />
                <YStack
                  style={{ height: '100%', width: '100%' }}
                  backgroundColor='$color.pink4Light'
                >
                  <Nav />
                  <NavigationStack.Navigator
                    screenOptions={{
                      headerShown: false
                    }}
                  >
                    <NavigationStack.Screen
                      name='Home'
                      component={HomeScreen}
                    />
                    <NavigationStack.Screen
                      name='Debug'
                      component={Debug}
                    />
                  </NavigationStack.Navigator>
                </YStack>
              </Theme>
          </PersistGate>
        </Provider>
      </TamaguiProvider>
    </NavigationContainer>
  )
}

export default App
