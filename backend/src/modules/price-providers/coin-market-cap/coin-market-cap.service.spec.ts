import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { CryptoCurrencies } from '../../../common/lib/crypto-currencies.enum';
import { AppConfigService } from '../../../modules/app-config/app-config.service';
import { CoinMarketCapService } from './coin-market-cap.service';

describe('CoinMarketCapService', () => {
  let coinMarketCapService: CoinMarketCapService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: HttpService,
          useValue: {
            get: (fromCurrency: string) =>
              fromCurrency
                ? of({
                    data: {
                      data: {
                        [CryptoCurrencies.TON]: {
                          quote: {
                            [CryptoCurrencies.USDT]: {
                              price: 0.5,
                            },
                          },
                        },
                      },
                    },
                  })
                : undefined,
          },
        },
        {
          provide: AppConfigService,
          useValue: {
            apiKeys: { coinMarketCap: 'tets' },
          },
        },
        CoinMarketCapService,
      ],
    }).compile();

    coinMarketCapService = app.get<CoinMarketCapService>(CoinMarketCapService);
  });

  describe('root', () => {
    it('should return price', async () => {
      expect(
        await coinMarketCapService.getPrice(
          CryptoCurrencies.TON,
          CryptoCurrencies.USDT,
        ),
      ).toBe(0.5);
    });

    it('should throw exception', async () => {
      expect(
        await coinMarketCapService
          .getPrice(undefined, undefined)
          .catch((err) => err.message),
      ).toBe('No data for undefined/undefined');
    });
  });
});
