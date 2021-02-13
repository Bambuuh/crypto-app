import { useNavigation } from '@react-navigation/native'
import React, { useContext } from 'react'
import CoinsFilterList from '../../components/CoinsFilterList'
import { CoinsContext } from '../../context'
import { Coin } from '../../graphql/types'

const ExchangeCurrencyScreen: React.FC<{}> = () => {

  const coinsContext = useContext(CoinsContext)
  const navigation = useNavigation()

  const onPressCoin = (coin: Coin) => {
    coinsContext.setExchangeCurrency(coin)
    navigation.goBack()
  }

  const shouldHighLight = (coin: Coin) => {
    return coin.asset_id === coinsContext.exchangeCurrency.asset_id
  }

  return (
    <CoinsFilterList
      shouldHighLight={shouldHighLight}
      coins={coinsContext.allCoins}
      loading={coinsContext.loading}
      onPressCoin={onPressCoin}
    />
  )
}

export default ExchangeCurrencyScreen