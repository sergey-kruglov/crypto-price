import { CryptoCurrencies } from '../../common/lib/crypto-currencies.enum';

export interface PriceData {
  fromCurrency: CryptoCurrencies;
  toCurrency: CryptoCurrencies;
  price: number;
}
