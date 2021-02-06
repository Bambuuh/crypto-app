import { useQuery } from '@apollo/client'
import { RouteProp } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import { HISTORY_QUERY } from '../../graphql'
import { HistoryQueryResponse } from '../../graphql/types'
import { MainStackParamsList } from '../../navigation/main'
import { ScreenRoute } from '../../navigation/navConstants'

type Props = {
  route: RouteProp<MainStackParamsList, ScreenRoute.DETAILS>
}

const CoinDetailsScreen: React.FC<Props> = ({ route }) => {

  const { coin } = route.params

  const { loading, data, error } = useQuery<HistoryQueryResponse>(HISTORY_QUERY(coin.asset_id))

  return (
    <View><Text>{coin.name}</Text></View>
  )
}

export default CoinDetailsScreen
