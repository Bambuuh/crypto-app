import React from 'react'
import { ViewProps } from 'react-native'
import { Coin } from '../../graphql/types'
import * as S from './styled'

type OwnProps = {
  coin: Coin
}

type Props = OwnProps & ViewProps

const CoinListItem: React.FC<Props> = ({ coin, ...props }) => {
  return (
    <S.Container {...props}>
      <S.IconImage source={{
        uri: coin.iconUrl,
      }} />
      <S.CoinName>{coin.name}</S.CoinName>
    </S.Container>
  )
}

export default CoinListItem