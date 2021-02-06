import React from 'react'
import { TextInputProps, ViewProps } from 'react-native'
import * as S from './styled'

type OwnProps = {
  inputProps: TextInputProps
}

type Props = OwnProps & ViewProps

const Input: React.FC<Props> = ({ inputProps, ...props }) => {
  return (
    <S.Container {...props}>
      <S.InputField {...inputProps} />
    </S.Container>
  )
}

export default Input