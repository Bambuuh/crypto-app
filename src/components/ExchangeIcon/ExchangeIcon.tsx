import React from 'react'
import { ViewProps } from 'react-native'
import * as S from './styled'

const arrow = require('./arrow.png')

type Props = ViewProps

const ExchangeIcon: React.FC<Props> = (props) => {
  return (
    <S.Container {...props}>
      <S.Arrow source={arrow} />
      <S.Arrow style={{ transform: [{ rotate: '180deg' }] }} source={arrow} />
    </S.Container>
  )
}

export default ExchangeIcon