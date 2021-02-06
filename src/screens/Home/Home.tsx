import React, { useContext, useEffect, useRef, useState } from 'react'
import ScreenContainer from '../../components/_general/ScreenContainer'
import { Coin } from '../../graphql/types'
import CoinListItem from '../../components/CoinListItem'
import { CoinsContext } from '../../context'
import { FlatList } from 'react-native-gesture-handler'
import * as S from './styled'
import Input from '../../components/Input'
import theme from '../../theme'
import FullScreenSpinner from '../../components/FullScreenSpinner'

const Home: React.FC<{}> = () => {

  const debounce = useRef<any>(undefined)
  const [search, setSearch] = useState('')
  const coinsContext = useContext(CoinsContext)
  const [filtered, setFiltered] = useState(coinsContext.data)

  useEffect(() => {
    filterCoins()
  }, [coinsContext.data])

  const filterCoins = () => {
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
  }

  const onSearchChange = (value: string) => {
    setSearch(value)
    clearTimeout(debounce.current)
    debounce.current = setTimeout(() => {
      filterCoins()
    }, 200)
  }

  if (coinsContext.loading) {
    return (<FullScreenSpinner />)
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
