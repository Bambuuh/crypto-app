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
    <S.SwiperButton {...viewProps}>
      <TouchableOpacity onPress={onPress}>
        <S.SwiperButtonText>{title}</S.SwiperButtonText>
      </TouchableOpacity>
    </S.SwiperButton>
  )
}

export default Button