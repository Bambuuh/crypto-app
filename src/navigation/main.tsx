import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Home from '../screens/Home'
import { ScreenRoute } from './navConstants'

const Main = createStackNavigator()

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Main.Navigator>
        <Main.Screen name={ScreenRoute.HOME} component={Home} />
      </Main.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation