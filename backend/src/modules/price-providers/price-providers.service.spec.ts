import { Test, TestingModule } from '@nestjs/testing';
import { CoinMarketCapService } from './coin-market-cap/coin-market-cap.service';
import { PriceProviders } from './price-providers.enum';
import { PriceProvidersService } from './price-providers.service';

describe('PriceProvidersService', () => {
  let priceProvidersService: PriceProvidersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CoinMarketCapService,
          useValue: 'test',
        },
        PriceProvidersService,
      ],
    }).compile();

    priceProvidersService = app.get<PriceProvidersService>(
      PriceProvidersService,
    );
  });

  describe('root', () => {
    it('should return provider', async () => {
      const provider = (await priceProvidersService.getProvider(
        PriceProviders.COIN_MARKET_CAP,
      )) as unknown as string;
      expect(provider === 'test').toBe(true);
    });

    it('should throw exception', async () => {
      let error;
      try {
        priceProvidersService.getProvider(undefined);
      } catch (err) {
        error = err.message;
      }

      expect(error).toBe('unknown price provider');
    });
  });
});
