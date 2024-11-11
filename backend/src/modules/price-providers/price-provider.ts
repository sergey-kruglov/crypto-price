import { CryptoCurrencies } from '../../common/lib/crypto-currencies.enum';

// For other provider implementations
export interface PriceProvider {
  getPrice(
    fromCurrency: CryptoCurrencies,
    toCurrency: CryptoCurrencies,
  ): Promise<number>;
}
