import styled from 'styled-components/native'
import theme from '../../theme'

export const Container = styled.View`
  flex: 1;
`

export const NoDataContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const NoDataText = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${theme.background.onColor};
`

export const TopContainer = styled.View`
  padding-top: ${theme.baseline * 2}px;
`

export const TopInnerContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 ${theme.baseline * 4}px;
`

export const CoinsContainer = styled.View`
  align-items: center;
  flex-direction: row;
`

export const CoinName = styled.Text`
  color: ${theme.background.onColor};
  font-size: 22px;
  font-weight: bold;
`

export const CoinPrice = styled.Text`
  margin-left: ${theme.baseline * 4}px;
  color: ${theme.background.onColor};
  font-size: 18px;
`

export const ChartTitle = styled.Text`
  margin-left: ${theme.baseline * 2}px;
  margin-bottom: ${theme.baseline * 2}px;
  color: ${theme.background.onColor};
  font-size: 18px;
`

export const ChartContainer = styled.View`
  border-radius: ${theme.borderRadious.wide * 2}px;
  background-color: ${theme.primary.color};
`
