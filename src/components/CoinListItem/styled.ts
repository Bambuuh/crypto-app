import styled from 'styled-components/native'
import theme from '../../theme'

export const Container = styled.View`
  flex-direction: row;
  background-color: ${theme.primary.color};
  padding: 8px;
  border-radius: 10px;
  align-items: center;
`

export const IconImage = styled.Image`
  width: 30px;
  height: 30px;
  margin-right: 16px;
`

export const CoinName = styled.Text`
  color: ${theme.primary.onColor};
`
