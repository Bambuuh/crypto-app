import styled from 'styled-components/native'
import theme from '../../theme'

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${theme.primary.color};
  padding: ${theme.baseline}px;
  border-radius: ${theme.borderRadious.wide}px;
  margin-right: ${theme.baseline * 2}px;
`

export const Title = styled.Text`
  color: ${theme.primary.onColor};
`
