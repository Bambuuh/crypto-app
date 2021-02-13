import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StatusBar } from 'react-native'
import { Coin } from '../graphql/types'
import CoinDetailsScreen from '../screens/CoinDetailsScreen'
import CompareCurrencyScreen from '../screens/ExchangeCurrencyScreen'
import HomeScreen from '../screens/HomeScreen'
import theme from '../theme'
import { ScreenRoute, StackRoute } from './navConstants'

export type MainStackParamsList = {
  [ScreenRoute.HOME]: undefined;
  [ScreenRoute.DETAILS]: { coin: Coin };
  [ScreenRoute.SET_EXCHANGE_CURRENCY]: { coin: Coin };
};

const MainStack = createStackNavigator<MainStackParamsList>()
const RootStack = createStackNavigator()
const ModalStack = createStackNavigator()


const MainNavigation = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerStyle: { elevation: 0, shadowOpacity: 0 } }}>
      <MainStack.Screen name={ScreenRoute.HOME} component={HomeScreen} options={{
        title: "Home"
      }} />
      <MainStack.Screen name={ScreenRoute.DETAILS} component={CoinDetailsScreen} options={({ route }) => ({
        header: () => null,
        title: route.params.coin.name
      })} />
      <MainStack.Screen name={ScreenRoute.SET_EXCHANGE_CURRENCY} component={CompareCurrencyScreen} options={{
        title: "Exchange currency",

      }} />
    </MainStack.Navigator>
  )
}

const ModalStackNavigation = () => {
  return (
    <ModalStack.Navigator>
      <ModalStack.Screen name={ScreenRoute.SET_EXCHANGE_CURRENCY} component={CompareCurrencyScreen} />
    </ModalStack.Navigator>
  )
}

const rootStack = () => {
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
      <StatusBar barStyle="light-content" />
      <RootStack.Navigator>
        <RootStack.Screen options={{ headerShown: false }} name={StackRoute.MAIN} component={MainNavigation} />
        <RootStack.Screen name={StackRoute.MODAL} component={ModalStackNavigation} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default rootStack