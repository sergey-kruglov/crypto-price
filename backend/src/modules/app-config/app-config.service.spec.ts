import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigService } from './app-config.service';

const ENV = {
  HOST: 'localhost',
  PORT: '5050',
  API_KEY__COIN_MARKET_CAP: 'API_KEY__COIN_MARKET_CAP',
  MONGODB_URI: 'MONGODB_URI',
};

describe('AppConfigService', () => {
  let appConfigService: AppConfigService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => ENV[key]),
            getOrThrow: jest.fn((key: string) => ENV[key]),
          },
        },
      ],
    }).compile();

    appConfigService = app.get<AppConfigService>(AppConfigService);
  });

  describe('root', () => {
    it('should return correct data', () => {
      expect(appConfigService.host).toBe(ENV.HOST);
      expect(appConfigService.port).toBe(5050);
      expect(appConfigService.apiKeys.coinMarketCap).toBe(
        ENV.API_KEY__COIN_MARKET_CAP,
      );
      expect(appConfigService.mongodbUri).toBe(ENV.MONGODB_URI);
    });
  });
});
