import { gql } from '@apollo/client'

export const ICONS_QUERY = gql`
  {
    getIcons {
      asset_id
      url
    }
    getCoins
  }
`

export const COINS_QUERY = gql`
  {
    getCoins {
      asset_id
      name
      type_is_crypto
      id_icon
      price_usd
    }
    getIcons {
      asset_id
      url
    }
  }
`

export const HISTORY_QUERY = (coinId: string) => gql`
  {
    getCoinHistory(assetId: "${coinId}") {
      time_period_start
      time_period_end
      price_close
    }
  }
`
