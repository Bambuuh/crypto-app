import styled from 'styled-components/native'
import theme from '../../theme'

export const SwiperButton = styled.View<{ isLast: boolean; active: boolean }>`
  width: 80px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.primary.color};
  padding: ${theme.baseline}px;
  border-radius: ${theme.borderRadious.wide}px;
  margin-right: ${theme.baseline * 2}px;
  ${({ isLast }) => isLast && `margin-right: 0`}
  ${({ active }) => active && `background-color: ${theme.accent.color}`}
`

export const SwiperButtonText = styled.Text`
  color: ${theme.primary.onColor};
`
