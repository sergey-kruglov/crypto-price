import { Test, TestingModule } from '@nestjs/testing';
import { CryptoCurrencies } from '../../common/lib/crypto-currencies.enum';
import { PriceProvider } from '../price-providers/price-provider';
import { PriceProvidersService } from '../price-providers/price-providers.service';
import { PricesRepository } from './prices.repository';
import { PricesService } from './prices.service';

describe('PricesService', () => {
  let pricesService: PricesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PriceProvidersService,
          useValue: {
            getProvider: (): PriceProvider => {
              return { getPrice: async () => 0.5 };
            },
          },
        },
        {
          provide: PricesRepository,
          useValue: {
            getPrice: () => 0.5,
          },
        },
        PricesService,
      ],
    }).compile();

    pricesService = app.get<PricesService>(PricesService);
  });

  describe('root', () => {
    it('should return currencies', async () => {
      expect(await pricesService.getCurrencies()).toStrictEqual([
        'USDT',
        'TON',
      ]);
    });

    it('should return price 1', async () => {
      expect(
        await pricesService.getPrice(
          CryptoCurrencies.TON,
          CryptoCurrencies.TON,
        ),
      ).toStrictEqual({
        fromCurrency: CryptoCurrencies.TON,
        toCurrency: CryptoCurrencies.TON,
        price: 1,
      });
    });

    it('should return price 0.5', async () => {
      expect(
        await pricesService.getPrice(
          CryptoCurrencies.TON,
          CryptoCurrencies.USDT,
        ),
      ).toEqual({
        fromCurrency: CryptoCurrencies.TON,
        toCurrency: CryptoCurrencies.USDT,
        price: 0.5,
      });
    });

    it('should return price 0.5 without cache', async () => {
      expect(
        await pricesService.getPrice(
          CryptoCurrencies.TON,
          CryptoCurrencies.USDT,
          true,
        ),
      ).toEqual({
        fromCurrency: CryptoCurrencies.TON,
        toCurrency: CryptoCurrencies.USDT,
        price: 0.5,
      });
    });
  });
});
