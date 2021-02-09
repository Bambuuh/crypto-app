import { useQuery } from '@apollo/client'
import { RouteProp } from '@react-navigation/native'
import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import { HISTORY_QUERY } from '../../graphql'
import { HistoryQueryResponse } from '../../graphql/types'
import { MainStackParamsList } from '../../navigation/main'
import { ScreenRoute } from '../../navigation/navConstants'
import { LineChart } from "react-native-chart-kit";
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

  const hasNoDAta = !loading && data?.getCoinHistory.length === 0

  if (error) {
    console.log(error)
    return null
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

  const renderNoData = () => {
    return (
      <S.NoDataContainer>
        <S.NoDataText>No data for period</S.NoDataText>
      </S.NoDataContainer>
    )
  }

  const padding = theme.baseline * 2

  return (
    <S.Container>
      <S.TopContainer >
        <SafeAreaView />
        <S.TopInnerContainer>
          <S.CoinName>{coin.name}</S.CoinName>
          {coin.price_usd && <S.CoinPrice>${coin.price_usd.toFixed(2)}</S.CoinPrice>}
        </S.TopInnerContainer>
        <SideSwiper selectedValue={period} onPressItem={onPressItem} items={swiperItems} />
      </S.TopContainer>
      {
        loading ? <FullScreenSpinner /> :
          hasNoDAta ?
            renderNoData() :
            <S.ChartContainer style={{ padding, width: width - padding * 2, marginHorizontal: padding }}>
              <LineChart
                data={{
                  labels: [],
                  datasets: getDataSet(),
                }}
                height={height * 0.25}
                width={width - (padding * 2) * 2}
                yAxisLabel="$"
                yAxisInterval={1}
                formatYLabel={formatYLabel}
                chartConfig={{
                  style: { padding: theme.baseline },
                  propsForLabels: {
                    fontSize: 12,
                  },
                  backgroundGradientFrom: theme.primary.color,
                  backgroundGradientTo: theme.primary.color,
                  fillShadowGradient: "#42598f",
                  fillShadowGradientOpacity: 1,
                  decimalPlaces: 2,
                  color: () => "#6592e2",
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                withVerticalLabels={false}
                bezier
              />
            </S.ChartContainer>
      }
    </S.Container>
  )
}

export default CoinDetailsScreen
