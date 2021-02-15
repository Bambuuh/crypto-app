import React from 'react'
import { ViewProps } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as S from './styled'

type OwnProps = {
  title: string
  onPress: () => void
}

type Props = OwnProps & ViewProps

const Button: React.FC<Props> = ({ title, onPress, ...viewProps }) => {
  return (
    <S.Container {...viewProps}>
      <TouchableOpacity onPress={onPress}>
        <S.Title>{title}</S.Title>
      </TouchableOpacity>
    </S.Container>
  )
}

export default Button