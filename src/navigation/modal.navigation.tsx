import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ExchangeCurrencyScreen from '../screens/ExchangeCurrencyScreen'
import { ScreenRoute } from './navConstants'

export type ModalStackParamsList = {
  [ScreenRoute.SET_EXCHANGE_CURRENCY]: undefined;
};

const ModalStack = createStackNavigator<ModalStackParamsList>()

const ModalStackNavigation = () => {
  return (
    <ModalStack.Navigator>
      <ModalStack.Screen name={ScreenRoute.SET_EXCHANGE_CURRENCY} component={ExchangeCurrencyScreen} />
    </ModalStack.Navigator>
  )
}

export default ModalStackNavigation