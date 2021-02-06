import styled from 'styled-components/native'
import theme from '../../theme'

export const Container = styled.View``

export const InputField = styled.TextInput`
  background-color: white;
  border-radius: ${theme.borderRadious.wide}px;
  height: ${theme.baseline * 5}px;
  color: ${theme.background.color};
  font-weight: bold;
  padding: 0 ${theme.baseline * 2}px;
`
