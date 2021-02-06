import React, { useContext, useRef, useState } from 'react'
import { Text, View } from 'react-native'
import ScreenContainer from '../../components/_general/ScreenContainer'
import { Coin } from '../../graphql/types'
import CoinListItem from '../../components/CoinListItem'
import { CoinsContext } from '../../context'
import { FlatList } from 'react-native-gesture-handler'
import * as S from './styled'
import Input from '../../components/Input'
import theme from '../../theme'

const Home: React.FC<{}> = () => {

  const debounce = useRef<any>(undefined)

  const [search, setSearch] = useState('')
  const coinsContext = useContext(CoinsContext)
  const [filtered, setFiltered] = useState(coinsContext.data)

  const onSearchChange = (value: string) => {
    setSearch(value)
    clearTimeout(debounce.current)
    debounce.current = setTimeout(() => {
      console.log('running')
      const query = search.toLowerCase().trim()
      if (query.trim().length === 0) {
        setFiltered(coinsContext.data)
        return
      }
      const filteredCoins = coinsContext.data.filter(coin => {
        const matchName = coin.name.toLowerCase().includes(query)
        const matchCode = coin.asset_id.toLowerCase().includes(query)
        return matchName || matchCode
      })
      setFiltered(filteredCoins)
    }, 200)
  }

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
      <S.SearchContainer>
        <Input inputProps={{ placeholder: 'Search', value: search, onChangeText: onSearchChange }} />
      </S.SearchContainer>
      <FlatList
        contentContainerStyle={{ paddingTop: theme.baseline * 2 }}
        showsVerticalScrollIndicator={false}
        data={filtered}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </ScreenContainer>
  )
}

export default Home
