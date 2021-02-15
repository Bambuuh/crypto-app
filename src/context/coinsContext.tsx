import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from '@apollo/client'
import { COINS_QUERY } from '../graphql'
import { Coin, CoinsQueryResponse } from '../graphql/types'

export type CoinsContextType = {
  loading: boolean
  allCoins: Coin[]
  cryptoCoins: Coin[]
  exchangeCurrency: Coin
  setExchangeCurrency: (coin: Coin) => void
  error: any
}

export const CoinsContext = React.createContext<CoinsContextType>({
  loading: false,
  allCoins: [],
  cryptoCoins: [],
  exchangeCurrency: undefined,
  error: null,
  setExchangeCurrency: (coin: Coin) => { }
})

export const CoinsContextRoot: React.FC = ({ children }) => {

  const [exchangeCurrency, setExchangeCurrency] = useState<Coin>()

  const { loading, data, error } = useQuery<CoinsQueryResponse>(COINS_QUERY)

  const allCoins = useRef<Coin[]>([])
  const cryptoCoins = useRef<Coin[]>([])

  useEffect(() => {
    if (!exchangeCurrency && data && data.getCoins.length > 0) {
      const initialCompareCurrency = data.getCoins.find(c => c.asset_id === 'USD')
      setExchangeCurrency(initialCompareCurrency)
    }

    if (data) {
      const length = data.getCoins.length
      for (let i = 0; i < length; i++) {
        const coin = data.getCoins[i]
        const icon = data.getIcons.find(icon => icon.asset_id === coin.asset_id)
        if (icon) {
          const mutated = { ...coin, iconUrl: icon!.url }
          allCoins.current.push(mutated)
          if (coin.type_is_crypto) {
            cryptoCoins.current.push(mutated)
          }
        }
      }
    }
  }, [data])

  const value: CoinsContextType = {
    loading,
    allCoins: allCoins.current,
    cryptoCoins: cryptoCoins.current,
    exchangeCurrency,
    setExchangeCurrency,
    error
  }

  return (
    <CoinsContext.Provider value={value}>
      {children}
    </CoinsContext.Provider>
  )
}
