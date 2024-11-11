import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  readonly host: string;
  readonly port: number;

  readonly apiKeys: {
    coinMarketCap: string;
  };

  readonly mongodbUri: string;

  constructor(configService: ConfigService) {
    this.host = configService.get('HOST') || '0.0.0.0';
    this.port = Number(configService.get('PORT')) || 8080;
    this.apiKeys = {
      coinMarketCap: configService.getOrThrow('API_KEY__COIN_MARKET_CAP'),
    };
    this.mongodbUri = configService.getOrThrow('MONGODB_URI');
  }
}
