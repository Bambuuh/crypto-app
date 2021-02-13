import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import theme from '../theme'
import MainNavigation from './main.navigation'
import ModalStackNavigation from './modal.navigation'
import { StackRoute } from './navConstants'

export type RootStackParamsList = {
  [StackRoute.MODAL]: undefined;
  [StackRoute.MAIN]: undefined
};

const RootStack = createStackNavigator<RootStackParamsList>()

const RootNavigation = () => {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: theme.background.color,
          border: theme.background.color,
          card: theme.primary.color,
          notification: theme.primary.color,
          primary: theme.primary.color,
          text: theme.primary.onColor
        },
        dark: true
      }}
    >
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name={StackRoute.MAIN} component={MainNavigation} options={{ headerShown: false }} />
        <RootStack.Screen name={StackRoute.MODAL} component={ModalStackNavigation} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigation