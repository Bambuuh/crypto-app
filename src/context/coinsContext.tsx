import React from 'react'
import { useQuery } from '@apollo/client'
import { COINS_QUERY } from '../graphql'
import { Coin, CoinsQueryResponse } from '../graphql/types'

export type CoinsContextType = {
  loading: boolean
  data: Coin[]
  error: any
}

export const CoinsContext = React.createContext<CoinsContextType>({
  loading: false,
  data: [],
  error: null
})

export const CoinsContextRoot: React.FC = ({ children }) => {

  const { loading, data, error } = useQuery<CoinsQueryResponse>(COINS_QUERY)

  let mutated: Coin[] = []

  if (data) {
    const length = data.getCoins.length
    for (let i = 0; i < length; i++) {
      const coin = data.getCoins[i]
      if (coin.type_is_crypto) {
        const icon = data.getIcons.find(icon => icon.asset_id === coin.asset_id)
        if (icon) {
          mutated.push({ ...coin, iconUrl: icon!.url })
        }
      }
    }
  }

  const value: CoinsContextType = {
    loading,
    data: mutated,
    error
  }

  return (
    <CoinsContext.Provider value={value}>
      {children}
    </CoinsContext.Provider>
  )
}
