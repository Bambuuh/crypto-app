import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ExchangeCurrencyScreen from '../screens/ExchangeCurrencyScreen'
import { ScreenRoute } from './navConstants'
import { Text } from 'react-native';
import theme from '../theme';
import { defaultHeaderOptions } from './common';
import { useNavigation } from '@react-navigation/native';

export type ModalStackParamsList = {
  [ScreenRoute.SET_EXCHANGE_CURRENCY]: undefined;
};

const ModalStack = createStackNavigator<ModalStackParamsList>()


const CustomBackButton = () => {
  const navigation = useNavigation()
  const onPress = () => navigation.goBack()
  return <Text onPress={onPress} style={{ marginLeft: theme.baseline * 2, color: theme.accent.onColor, fontSize: 18 }}>Cancel</Text>
}

const ModalStackNavigation = () => {
  return (
    <ModalStack.Navigator screenOptions={defaultHeaderOptions} >
      <ModalStack.Screen
        options={{
          title: 'Exchange currency',
          headerLeft: () => <CustomBackButton />
        }}
        name={ScreenRoute.SET_EXCHANGE_CURRENCY}
        component={ExchangeCurrencyScreen}
      />
    </ModalStack.Navigator>
  )
}

export default ModalStackNavigation