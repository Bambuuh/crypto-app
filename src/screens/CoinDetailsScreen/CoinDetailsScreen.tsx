import { useQuery } from '@apollo/client'
import { RouteProp, useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { Dimensions } from 'react-native'
import { HISTORY_QUERY } from '../../graphql'
import { HistoryQueryResponse } from '../../graphql/types'
import { MainStackParamsList } from '../../navigation/main.navigation'
import { ScreenRoute, StackRoute } from '../../navigation/navConstants'
import { BarChart, LineChart } from "react-native-chart-kit";
import theme from '../../theme'
import FullScreenSpinner from '../../components/FullScreenSpinner'
import * as S from './styled'
import SideSwiper, { SideSwiperItem } from '../../components/SideSwiper'
import { CoinsContext } from '../../context'
import Button from '../../components/Button'
import ExchangeIcon from '../../components/ExchangeIcon/ExchangeIcon'
import { ScrollView } from 'react-native-gesture-handler'

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

  const coinsContext = useContext(CoinsContext)
  const history = useQuery<HistoryQueryResponse>(HISTORY_QUERY(coin.asset_id, coinsContext.exchangeCurrency.asset_id, period))
  const navigation = useNavigation()

  const hasNoDAta = !history.loading && history.data?.getCoinHistory.length === 0

  const getPriceDataSet = () => {
    return [{ data: history.data!.getCoinHistory.map(h => h.price_close), }]
  }

  const getVolumeDataSet = () => {
    return [{ data: history.data!.getCoinHistory.map(h => h.volume_traded) }]
  }

  const formatYLabel = (label: string, decimals: number) => {
    if (+label > 10000) {
      return `${(+label / 1000).toFixed(decimals)}k`
    }
    return label
  }

  const formatLineLabels = (label: string) => formatYLabel(label, 2)
  const formatBarLabels = (label: string) => formatYLabel(label, 0)

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

  const onPressExchangeCurrency = () => {
    navigation.navigate(StackRoute.MODAL, { screen: ScreenRoute.SET_EXCHANGE_CURRENCY })
  }

  const padding = theme.baseline * 2

  const chartConfig = {
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
  }

  const chartWidth = width - (padding * 2) * 2

  return (
    <ScrollView bounces={false}>
      <S.Container>
        <S.TopContainer >
          <S.TopInnerContainer>
            <S.CoinsContainer>
              <S.CoinName>{coin.name}</S.CoinName>
              <ExchangeIcon style={{ marginHorizontal: theme.baseline }} />
              <Button onPress={onPressExchangeCurrency} title={coinsContext.exchangeCurrency.name} />
            </S.CoinsContainer>
            {coin.price_usd && <S.CoinPrice>${coin.price_usd.toFixed(2)}</S.CoinPrice>}
          </S.TopInnerContainer>
          <SideSwiper selectedValue={period} onPressItem={onPressItem} items={swiperItems} />
        </S.TopContainer>
        {
          history.loading ? <FullScreenSpinner /> :
            hasNoDAta ?
              renderNoData() :
              <>
                <S.ChartTitle>{coin.asset_id} per {coinsContext.exchangeCurrency.asset_id}</S.ChartTitle>
                <S.ChartContainer style={{ padding, width: width - padding * 2, marginHorizontal: padding }}>
                  <LineChart
                    data={{
                      labels: [],
                      datasets: getPriceDataSet(),
                    }}
                    height={height * 0.25}
                    width={chartWidth}
                    yAxisInterval={1}
                    formatYLabel={formatLineLabels}
                    chartConfig={chartConfig}
                    withVerticalLabels={false}
                    bezier
                  />
                </S.ChartContainer>
                <S.ChartTitle style={{ marginTop: theme.baseline * 4 }}>Volume traded</S.ChartTitle>
                <S.ChartContainer style={{ padding, width: width - padding * 2, marginHorizontal: padding }}>
                  <BarChart
                    yAxisSuffix=""
                    yAxisLabel=""
                    data={{ labels: [], datasets: getVolumeDataSet() }}
                    width={chartWidth}
                    height={height * 0.25}
                    chartConfig={{ ...chartConfig, barPercentage: 0.5, formatYLabel: formatBarLabels }}
                    withInnerLines={false}
                    verticalLabelRotation={30}
                  />
                </S.ChartContainer>
              </>
        }
      </S.Container>
    </ScrollView>
  )
}

export default CoinDetailsScreen
