import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CoinMarketCapService } from './coin-market-cap/coin-market-cap.service';
import { PriceProvider } from './price-provider';
import { PriceProviders } from './price-providers.enum';

@Injectable()
export class PriceProvidersService {
  constructor(private readonly coinMarketCapService: CoinMarketCapService) {}

  getProvider(priceProvider: PriceProviders): PriceProvider {
    switch (priceProvider) {
      case PriceProviders.COIN_MARKET_CAP:
        return this.coinMarketCapService;
      default:
        throw new InternalServerErrorException('unknown price provider');
    }
  }
}
