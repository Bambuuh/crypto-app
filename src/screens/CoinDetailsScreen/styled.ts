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

const chartSpaceRight = 78
const chartSpaceLeft = 63
export const chartExtraWidth = chartSpaceRight + chartSpaceLeft
export const ChartContainer = styled.View`
  width: 100%;
  background-color: red;
  margin-right: -${chartSpaceRight}px;
  margin-left: -${chartSpaceLeft}px;
  margin-bottom: -150px;
`
