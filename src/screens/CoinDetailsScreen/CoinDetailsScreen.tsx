import { RouteProp } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import { MainStackParamsList } from '../../navigation/main'
import { ScreenRoute } from '../../navigation/navConstants'

type Props = {
  route: RouteProp<MainStackParamsList, ScreenRoute.DETAILS>
}

const CoinDetailsScreen: React.FC<Props> = ({ route }) => {
  const { coin } = route.params
  return (
    <View><Text>{coin.name}</Text></View>
  )
}

export default CoinDetailsScreen
