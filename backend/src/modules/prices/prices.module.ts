import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PriceProvidersModule } from '../../modules/price-providers/price-providers.module';
import { AppConfigModule } from '../app-config/app-config.module';
import { PricesController } from './prices.controller';
import { PricesRepository } from './prices.repository';
import { Price, PriceSchema } from './prices.schema';
import { PricesService } from './prices.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Price.name, schema: PriceSchema }]),
    AppConfigModule,
    PriceProvidersModule,
  ],
  providers: [PricesService, PricesRepository],
  controllers: [PricesController],
})
export class PricesModule {}
