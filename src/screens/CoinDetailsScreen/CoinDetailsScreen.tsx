import { useQuery } from '@apollo/client'
import { RouteProp } from '@react-navigation/native'
import React from 'react'
import { Dimensions, View } from 'react-native'
import { HISTORY_QUERY } from '../../graphql'
import { HistoryQueryResponse } from '../../graphql/types'
import { MainStackParamsList } from '../../navigation/main'
import { ScreenRoute } from '../../navigation/navConstants'

import {
  LineChart,
} from "react-native-chart-kit";
import { getMonthFromDate } from '../../utils/date'
import theme from '../../theme'

type Props = {
  route: RouteProp<MainStackParamsList, ScreenRoute.DETAILS>
}

const CoinDetailsScreen: React.FC<Props> = ({ route }) => {

  const { coin } = route.params

  const { loading, data, error } = useQuery<HistoryQueryResponse>(HISTORY_QUERY(coin.asset_id))

  if (loading && !data) {
    return null
  }

  const getPrettyLabels = () => {
    const labels = data!.getCoinHistory.map(h => getMonthFromDate(h.time_period_start))
    return labels
  }

  const getDataSet = () => {
    return [{ data: data!.getCoinHistory.map(h => h.price_close), }]
  }

  const formatYLabel = (label: string) => {
    if (+label > 10000) {
      return `${(+label / 1000).toFixed(2)}k`
    }
    return label
  }

  return (
    <View>
      <LineChart

        data={{
          labels: getPrettyLabels(),
          datasets: getDataSet()
        }}
        width={Dimensions.get("window").width}
        height={220}
        yAxisLabel="$"
        yAxisInterval={1}
        formatYLabel={formatYLabel}
        chartConfig={{
          propsForLabels: {
            fontSize: 8
          },
          backgroundColor: theme.background.color,
          backgroundGradientFrom: theme.background.color,
          backgroundGradientTo: theme.background.color,
          fillShadowGradient: "#1e5055",
          fillShadowGradientOpacity: 1,
          decimalPlaces: 2,
          color: () => "#41c28b",
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "0",
          }
        }}
        bezier
        style={{
        }}
        withHorizontalLines={false}
        withVerticalLines={false}
      />
    </View>
  )
}

export default CoinDetailsScreen
