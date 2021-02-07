import { useQuery } from '@apollo/client'
import { RouteProp } from '@react-navigation/native'
import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import { HISTORY_QUERY } from '../../graphql'
import { HistoryQueryResponse } from '../../graphql/types'
import { MainStackParamsList } from '../../navigation/main'
import { ScreenRoute } from '../../navigation/navConstants'
import { LineChart } from "react-native-chart-kit";
import { getMonthFromDate } from '../../utils/date'
import theme from '../../theme'
import FullScreenSpinner from '../../components/FullScreenSpinner'
import * as S from './styled'
import { SafeAreaView } from 'react-native-safe-area-context'
import SideSwiper, { SideSwiperItem } from '../../components/SideSwiper'

type Props = {
  route: RouteProp<MainStackParamsList, ScreenRoute.DETAILS>
}

const { width, height } = Dimensions.get('window')

const swiperItems: SideSwiperItem[] = [
  { title: 'Hour', value: 'hour' },
  { title: 'Day', value: 'day' },
  { title: 'Week', value: 'week' },
  { title: 'Month', value: 'month' },
  { title: '1 Year', value: 'year' },
  { title: '5 Years', value: '5years' },
  { title: 'All Time', value: 'all' },
]

const CoinDetailsScreen: React.FC<Props> = ({ route }) => {
  const { coin } = route.params

  const [period, setPeriod] = useState('week')

  const { loading, data, error } = useQuery<HistoryQueryResponse>(HISTORY_QUERY(coin.asset_id, period))

  if (error) {
    console.log(error)
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


  const onPressItem = (value: string) => {
    setPeriod(value)
  }

  const oneSpace = data ? Math.ceil((width - 63) / data!.getCoinHistory.length) * 1.35 : 0

  return (
    <S.Container>
      <S.TopContainer >
        <SafeAreaView />
        <S.CoinName>{coin.name}</S.CoinName>
        <SideSwiper selectedValue={period} onPressItem={onPressItem} items={swiperItems} />
      </S.TopContainer>
      {
        loading ? <FullScreenSpinner /> :
          <S.ChartContainer style={{ marginRight: -oneSpace }} >
            <LineChart
              style={{ paddingRight: 0, paddingLeft: 0 }}
              data={{
                labels: getPrettyLabels(),
                datasets: getDataSet(),
              }}
              height={height * 0.75}
              width={width + oneSpace}
              yAxisLabel="$"
              yAxisInterval={1}
              formatYLabel={formatYLabel}
              yLabelsOffset={-50}
              chartConfig={{
                propsForLabels: {
                  fontSize: 10,
                },
                backgroundColor: theme.background.color,
                backgroundGradientFrom: theme.background.color,
                backgroundGradientTo: theme.background.color,
                fillShadowGradient: "#42598f",
                fillShadowGradientOpacity: 1,
                decimalPlaces: 2,
                color: () => "#6592e2",
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              withOuterLines={false}
              withDots={false}
              withHorizontalLines={false}
              withVerticalLines={false}
              bezier
            />
          </S.ChartContainer>
      }
    </S.Container>
  )
}

export default CoinDetailsScreen
