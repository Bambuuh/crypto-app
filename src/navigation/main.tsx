import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StatusBar } from 'react-native'
import Home from '../screens/Home'
import theme from '../theme'
import { ScreenRoute } from './navConstants'

const Main = createStackNavigator()

const MainNavigation = () => {
  return (
    <NavigationContainer theme={{
      colors: {
        background: theme.background.color,
        border: theme.background.color,
        card: theme.primary.color,
        notification: theme.primary.color,
        primary: theme.primary.color,
        text: theme.primary.onColor
      },
      dark: true
    }}>
      <StatusBar barStyle="light-content" />
      <Main.Navigator screenOptions={{ headerStyle: { elevation: 0, shadowOpacity: 0 } }}>
        <Main.Screen name={ScreenRoute.HOME} component={Home} options={{
          title: "Home"
        }} />
      </Main.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation