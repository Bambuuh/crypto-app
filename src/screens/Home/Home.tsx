import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import ScreenContainer from '../../components/_general/ScreenContainer'
import { Coin } from '../../graphql/types'
import CoinListItem from '../../components/CoinListItem'
import { CoinsContext } from '../../context'
import { FlatList } from 'react-native-gesture-handler'

const Home: React.FC<{}> = () => {

  const coinsContext = useContext(CoinsContext)

  if (coinsContext.loading) {
    return (
      <ScreenContainer>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'white' }}>COINS LOADING: {coinsContext.loading}</Text>
        </View>
      </ScreenContainer>
    )
  }

  const renderItem = ({ item }: { item: Coin }) => <CoinListItem style={{ marginBottom: 8 }} coin={item} />
  const keyExtractor = (item: Coin) => item.asset_id

  return (
    <ScreenContainer style={{ paddingBottom: 0 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={coinsContext.data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </ScreenContainer>
  )
}

export default Home
