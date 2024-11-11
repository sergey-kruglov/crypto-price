import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CryptoCurrencies } from '../../../common/lib/crypto-currencies.enum';
import { AppConfigService } from '../../../modules/app-config/app-config.service';
import { PriceProvider } from '../price-provider';
import { CoinMarketCapResponse } from './coin-market-cap.types';

@Injectable()
export class CoinMarketCapService implements PriceProvider {
  private readonly logger = new Logger(CoinMarketCapService.name);

  private readonly API_URL = 'https://pro-api.coinmarketcap.com';
  private readonly HEADERS: Record<string, string>;

  constructor(
    private readonly httpService: HttpService,
    appConfig: AppConfigService,
  ) {
    this.HEADERS = {
      Accept: 'application/json',
      'Accept-Encoding': 'deflate, gzip',
      'X-CMC_PRO_API_KEY': appConfig.apiKeys.coinMarketCap,
    };
  }

  async getPrice(
    fromCurrency: CryptoCurrencies,
    toCurrency: CryptoCurrencies,
  ): Promise<number> {
    this.logger.log(`get price from api ${fromCurrency}/${toCurrency}`);

    const req = this.httpService.get<CoinMarketCapResponse>(
      `${this.API_URL}/v1/cryptocurrency/quotes/latest`,
      {
        headers: this.HEADERS,
        params: {
          symbol: fromCurrency,
          convert: toCurrency,
        },
      },
    );
    const res = await lastValueFrom(req);

    const price = res.data.data[fromCurrency]?.quote[toCurrency]?.price;
    if (!price) {
      throw new InternalServerErrorException(
        `No data for ${fromCurrency}/${toCurrency}`,
      );
    }

    return price;
  }
}
