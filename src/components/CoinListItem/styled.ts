import styled from 'styled-components/native'
import theme from '../../theme'

export const Container = styled.View`
  flex-direction: row;
  background-color: ${theme.primary.color};
  padding: ${theme.baseline}px;
  border-radius: ${theme.borderRadious.wide}px;
  align-items: center;
`

const iconSize = theme.baseline * 4
export const IconImage = styled.Image`
  width: ${iconSize}px;
  height: ${iconSize}px;
  margin-right: ${theme.baseline * 2}px;
`

export const CoinName = styled.Text`
  color: ${theme.primary.onColor};
`
