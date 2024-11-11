import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppConfigModule } from '../app-config/app-config.module';
import { CoinMarketCapService } from './coin-market-cap/coin-market-cap.service';
import { PriceProvidersService } from './price-providers.service';

@Module({
  imports: [AppConfigModule, HttpModule],
  providers: [CoinMarketCapService, PriceProvidersService],
  exports: [PriceProvidersService],
})
export class PriceProvidersModule {}
