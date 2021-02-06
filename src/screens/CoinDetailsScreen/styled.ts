import styled from 'styled-components/native'
import theme from '../../theme'

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`

export const TopContainer = styled.View`
  padding-top: ${theme.baseline * 2}px;
`

export const CoinName = styled.Text`
  margin-left: ${theme.baseline * 4}px;
  color: ${theme.background.onColor};
  font-size: 28px;
  font-weight: bold;
`

const chartSpace = 50
export const chartExtraWidth = chartSpace * 2
export const ChartContainer = styled.View`
  margin-right: -${chartSpace}px;
  margin-left: -${chartSpace}px;
  margin-bottom: -${chartSpace * 3}px;
`
