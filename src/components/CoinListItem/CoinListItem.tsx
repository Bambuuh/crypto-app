import React from 'react'
import { ViewProps } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Coin } from '../../graphql/types'
import * as S from './styled'

type OwnProps = {
  coin: Coin
  onPressCoin: (coin: Coin) => void
}

type Props = OwnProps & ViewProps

const CoinListItem: React.FC<Props> = ({ onPressCoin, coin, ...props }) => {
  const onPress = () => {
    onPressCoin(coin)
  }
  return (
    <TouchableOpacity onPress={onPress} {...props}>
      <S.Container >
        <S.IconImage source={{
          uri: coin.iconUrl,
        }} />
        <S.CoinName>{coin.name}</S.CoinName>
      </S.Container>
    </TouchableOpacity>
  )
}

export default CoinListItem