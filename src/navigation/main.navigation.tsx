import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Coin } from '../graphql/types'
import CoinDetailsScreen from '../screens/CoinDetailsScreen'
import CompareCurrencyScreen from '../screens/ExchangeCurrencyScreen'
import HomeScreen from '../screens/HomeScreen'
import theme from '../theme'
import { ScreenRoute } from './navConstants'

export type MainStackParamsList = {
  [ScreenRoute.HOME]: undefined;
  [ScreenRoute.DETAILS]: { coin: Coin };
  [ScreenRoute.SET_EXCHANGE_CURRENCY]: { coin: Coin };
};

const MainStack = createStackNavigator<MainStackParamsList>()


const MainNavigation = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerStyle: { elevation: 0, shadowOpacity: 0 } }}>
      <MainStack.Screen name={ScreenRoute.HOME} component={HomeScreen} options={{
        title: "Coins"
      }} />
      <MainStack.Screen name={ScreenRoute.DETAILS} component={CoinDetailsScreen} options={({ route }) => ({
        headerStyle: {
          backgroundColor: 'transparent'
        },
        headerTintColor: theme.background.onColor,
        title: ''
      })} />
    </MainStack.Navigator>
  )
}



export default MainNavigation