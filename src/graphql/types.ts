export type Coin = {
  asset_id: string
  name: string
  type_is_crypto: 1 | 0
  id_icon: string
  iconUrl: string
  price_usd: number
}

export type Icon = {
  asset_id: string
  url: string
}

export type CoinsQueryResponse = { getIcons: Icon[]; getCoins: Coin[] }