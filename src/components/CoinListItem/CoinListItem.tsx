import { RouteProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { ViewProps } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Coin } from '../../graphql/types'
import { MainStackParamsList } from '../../navigation/main'
import { ScreenRoute } from '../../navigation/navConstants'
import * as S from './styled'

type OwnProps = {
  coin: Coin
}

type Props = OwnProps & ViewProps

const CoinListItem: React.FC<Props> = ({ coin, ...props }) => {
  const navigation = useNavigation()
  const onPress = () => {
    const params: MainStackParamsList[ScreenRoute.DETAILS] = {
      coin
    }
    navigation.navigate(ScreenRoute.DETAILS, params)
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