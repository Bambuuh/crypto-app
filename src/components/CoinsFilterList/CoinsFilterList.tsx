import React, { useEffect, useRef, useState } from 'react'
import ScreenContainer from '../_general/ScreenContainer'
import { Coin } from '../../graphql/types'
import CoinListItem from '../CoinListItem'
import { FlatList } from 'react-native-gesture-handler'
import * as S from './styled'
import Input from '../Input'
import theme from '../../theme'
import FullScreenSpinner from '../FullScreenSpinner'

type OwnProps = {
  onPressCoin: (coin: Coin) => void
  shouldHighLight?: (coin: Coin) => boolean
  coins: Coin[]
  loading: boolean
}

type Props = OwnProps

const Home: React.FC<Props> = ({ coins, onPressCoin, shouldHighLight, loading }) => {

  const debounce = useRef<any>(undefined)
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState(coins)

  useEffect(() => {
    filterCoins()
  }, [coins])

  const filterCoins = () => {
    const query = search.toLowerCase().trim()
    if (query.trim().length === 0) {
      setFiltered(coins)
      return
    }
    const filteredCoins = coins.filter(coin => {
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

  if (loading) {
    return (<FullScreenSpinner />)
  }

  const renderItem = ({ item }: { item: Coin }) => {
    const highlight = shouldHighLight && shouldHighLight(item)
    return <CoinListItem highlight={highlight} onPressCoin={onPressCoin} style={{ marginBottom: 8 }} coin={item} />
  }
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
