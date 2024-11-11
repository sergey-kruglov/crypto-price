import { CryptoCurrencies } from '../../../common/lib/crypto-currencies.enum';

export interface CoinMarketCapResponse<T = CoinMarketCapPriceData> {
  status: CoinMarketCapPriceStatus;
  data: T;
}

interface CoinMarketCapPriceStatus {
  timestamp: Date;
  error_code: number;
  error_message: null;
  elapsed: number;
  credit_count: number;
  notice: null;
}

interface CoinMarketCapPriceData {
  [CryptoCurrencies.TON]?: CoinMarketCapPriceCurrencyData;
  [CryptoCurrencies.USDT]?: CoinMarketCapPriceCurrencyData;
}

interface CoinMarketCapPriceCurrencyData {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: Date;
  tags: string[];
  max_supply: null;
  circulating_supply: number;
  total_supply: number;
  is_active: number;
  infinite_supply: boolean;
  platform: null;
  cmc_rank: number;
  is_fiat: number;
  self_reported_circulating_supply: number;
  self_reported_market_cap: number;
  tvl_ratio: null;
  last_updated: Date;
  quote: Quote;
}

interface Quote {
  [CryptoCurrencies.TON]?: CoinMarketCapQuoteCurrencyData;
  [CryptoCurrencies.USDT]?: CoinMarketCapQuoteCurrencyData;
}

interface CoinMarketCapQuoteCurrencyData {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl: null;
  last_updated: Date;
}
