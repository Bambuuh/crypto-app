import React from 'react'
import { ViewProps } from 'react-native'
import * as S from './styled'

type Props = ViewProps

const ScreenContainer: React.FC<Props> = ({ children, ...props }) => {
  return (
    <S.Container {...props}>{children}</S.Container>
  )
}

export default ScreenContainer