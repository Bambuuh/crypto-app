import React, { useContext } from 'react'
import { Coin } from '../../graphql/types'
import { CoinsContext } from '../../context'
import CoinsFilterList from '../../components/CoinsFilterList'
import { MainStackParamsList } from '../../navigation/main'
import { ScreenRoute } from '../../navigation/navConstants'
import { useNavigation } from '@react-navigation/native'

const Home: React.FC<{}> = () => {
  const coinsContext = useContext(CoinsContext)
  const navigation = useNavigation()

  const onPressCoin = (coin: Coin) => {
    const params: MainStackParamsList[ScreenRoute.DETAILS] = {
      coin
    }
    navigation.navigate(ScreenRoute.DETAILS, params)
  }

  return (
    <CoinsFilterList coins={coinsContext.cryptoCoins} loading={coinsContext.loading} onPressCoin={onPressCoin} />
  )
}

export default Home
